from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlmodel import select
from passlib.hash import bcrypt

import uuid
import random

from datetime import datetime,timedelta
import pytz
tz = pytz.timezone("Asia/Shanghai")

from db import engine, SessionDep
from models import User, UserCreate

from auth.jwt_handler import create_access_token

from utils.hash_utils import verify_password
from utils.email_utils import send_verification_email

router = APIRouter()

## generate a 6-digit verification code
def generate_verification_code() -> str:
    """
    Generate a 6-digit numeric verification code.

    Returns:
        str: A 6-digit verification code as a string.
    """
    return f"{random.randint(100001, 999998)}"


## ==========================================================================
@router.post("/register")
def register_user(user: UserCreate, session: SessionDep):
    print("Registering user...")
    print(user)
    # Check if the email already exists
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        # raise HTTPException(status_code=400, detail="Email already registered")
        return {"success":False,"message": "Email already registered"}

    # Hash the password
    hashed_password = bcrypt.hash(user.password)

    # Create the new user
    new_user = User(
        id=uuid.uuid4(),
        email=user.email,
        institution=user.institution,
        hashed_password=hashed_password,
        full_name=user.full_name,

        is_admin=False,

        register_time = datetime.now(tz),
        last_login_time = datetime.now(tz),

        is_verified = False,
        verification_code = generate_verification_code(),
        verification_code_expiration = datetime.now(tz) + timedelta(days=1),
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    # Send verification email
    send_verification_email(new_user.email, new_user.verification_code)

    return {"success":True,"message": "Registration successful! Please check your email for verification.", "user": new_user}

## ==========================================================================
## Login
class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str


@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, session: SessionDep):
    # user = session.query(User).filter(User.email == request.email).first()
    user = session.exec(select(User).where(User.email == request.email)).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "Bearer"}


