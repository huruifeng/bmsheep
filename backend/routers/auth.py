from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlmodel import select
from passlib.hash import bcrypt

import uuid

from db import engine, SessionDep
from models import User, UserCreate
from auth.jwt_handler import create_access_token, verify_password

SECRET_KEY = "your_secret_key"  # Replace with a secure secret key

router = APIRouter()

## ==========================================================================
@router.post("/register", response_model=UserCreate)
def register_user(user: UserCreate, session: SessionDep):
    # Check if the email already exists
    existing_user = session.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = bcrypt.hash(user.password)

    # Create the new user
    new_user = User(
        id=uuid.uuid4(),
        email=user.email,
        institution=user.institution,
        hashed_password=hashed_password,
        is_admin=False,
        is_verified=False,
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

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


