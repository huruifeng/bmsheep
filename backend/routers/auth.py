
'''
Logic for authentication:
1. Register a new user
 - Hash password
 - Create user
 - [Delete expired users]

2. Login
    - Verify password
    - Generate access token
    - Update last login time
    - if not verified, go to step 3
    - if verified, go to step 4

3. Verify email
    - Send verification code
    - Verify verification code
    - Update is_verified
    - Update last login time
    - if not verified, go to step 3
    - if verified, go to step 4

4. Set token and get user info

5. Go to dashboard


'''



from fastapi import APIRouter
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


def del_expired_users(session: SessionDep):
    print("Deleting expired users...")
    days = 30
    stmt = select(User).where(User.verification_code_expiration.replace(tzinfo=tz) < datetime.now(tz)+timedelta(days=days))
    session.exec(stmt).delete()
    session.commit()
    return {"success":True,"message": "Expired users deleted successfully"}

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
    # send_verification_email(new_user.email, new_user.verification_code)

    return {
        "success":True,
        "message": "Registration successful! Redirecting to login page...",
        "user": {"full_name": new_user.full_name, "email": new_user.email}
        }


## ==========================================================================
## get new token
@router.post("/get_token")
def get_token(request: dict, session: SessionDep):
    email = request.get("email")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        # raise HTTPException(status_code=401, detail="Invalid email or password")
        return {"success":False,"message": "Invalid email"}

    user_dict = {"full_name": user.full_name, "email": user.email, "is_admin": user.is_admin, "is_verified": user.is_verified}

    token = create_access_token(user_dict)
    return {"success":True, "message":"Token refreshed", "access_token": token,"token_type": "Bearer"}

## ==========================================================================

@router.post("/login")
def login(request: dict, session: SessionDep):
    email = request.get("email")
    password = request.get("password")

    # user = session.query(User).filter(User.email == request.email).first()
    user = session.exec(select(User).where(User.email == email)).first()
    if not user or not verify_password(password, user.hashed_password):
        # raise HTTPException(status_code=401, detail="Invalid email or password")
        return {"success":False,"message": "Invalid email or password"}

    ## update last login time
    user.last_login_time = datetime.now(tz)
    session.add(user)
    session.commit()
    session.refresh(user)

    user_dict = {"full_name": user.full_name, "email": user.email, "is_admin": user.is_admin, "is_verified": user.is_verified}

    token = create_access_token(user_dict)
    return {
        "success":True,
        "message": "Login successful",
        "access_token": token,
        "token_type": "Bearer"
    }



@router.post("/send_code")
def send_code(request: dict, session: SessionDep):
    email = request.get("email")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        # raise HTTPException(status_code=400, detail="User not found")
        return {"success":False,"message": "User not found"}

    if user.is_verified:
        # raise HTTPException(status_code=400, detail="Email already verified")
        return {"success":True,"message": "Email already verified"}

    if user.verification_code_expiration.replace(tzinfo=tz) < datetime.now(tz):
        # generate new code
        user.verification_code = generate_verification_code()
        user.verification_code_expiration = datetime.now(tz) + timedelta(days=1)
        session.add(user)
        session.commit()
        session.refresh(user)

        # send email
        send_verification_email(user.email, user.verification_code)
        return {"success": True, "message": "New verification code sent successfully"}
    else:
        send_verification_email(user.email, user.verification_code)
        return {"success": True, "message": "Verification code sent successfully"}

@router.post("/verify_email")
def verify_email(request: dict, session: SessionDep):
    email = request.get("email")
    code = request.get("code")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        # raise HTTPException(status_code=400, detail="User not found")
        return {"success":False,"message": "User not found"}

    if user.verification_code != code:
        # raise HTTPException(status_code=400, detail="Invalid verification code")
        return {"success":False,"message": "Invalid verification code"}

    if user.verification_code_expiration.replace(tzinfo=tz) < datetime.now(tz):
        # raise HTTPException(status_code=400, detail="Verification code has expired")
        return {"success":False,"message": "Verification code has expired"}

    user.is_verified = True
    user.verification_code_expiration = datetime.now(tz) + timedelta(days=36500)
    session.add(user)
    session.commit()
    session.refresh(user)

    user_dict = {"full_name": user.full_name, "email": user.email, "is_admin": user.is_admin, "is_verified": user.is_verified}

    token = create_access_token(user_dict)
    return {
        "success":True,
        "message": "Email verified successfully",
        "access_token": token,
        "token_type": "Bearer"
    }






