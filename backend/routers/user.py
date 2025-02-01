from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session

from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from auth.auth_middleware import JWTBearer

from db import SessionDep, get_session

from models import User

router = APIRouter()

@router.get("/get_profile", dependencies=[Depends(JWTBearer())])
def get_profile(email: str, user: dict = Depends(JWTBearer()), session: Session = Depends(get_session)):
    if email != user.get("email"):
        raise HTTPException(status_code=403, detail="Unauthorized access")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        # raise HTTPException(status_code=400, detail="User not found")
        return {"success": False, "message": "User not found"}

    user_dict = {"full_name": user.full_name, "email": user.email, "institution": user.institution, "is_admin": user.is_admin, "is_verified": user.is_verified}

    return {"success": True, "user": user_dict}

@router.put("/update_profile", dependencies=[Depends(JWTBearer())])
def update_profile(request: dict, user: dict = Depends(JWTBearer()), session: Session = Depends(get_session)):
    email = user.get("email")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        # raise HTTPException(status_code=400, detail="User not found")
        return {"success": False, "message": "User not found"}

    user.email = request.get("email", user.email)
    user.institution = request.get("institution", user.institution)

    session.add(user)
    session.commit()
    session.refresh(user)

    user_dict = {"full_name": user.full_name, "email": user.email, "institution": user.institution, "is_admin": user.is_admin, "is_verified": user.is_verified}

    return {"success": True, "user": user_dict}

@router.put("/update_password", dependencies=[Depends(JWTBearer())])
def update_password(request: dict, user: dict = Depends(JWTBearer()), session: Session = Depends(get_session)):
    email = user.get("email")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        # raise HTTPException(status_code=400, detail="User not found")
        return {"success": False, "message": "User not found"}

    current_password = request.get("currentPassword")
    if not pwd_context.verify(current_password, user.hashed_password):
        # raise HTTPException(status_code=400, detail="Invalid current password")
        return {"success": False, "message": "Invalid current password"}

    password = request.get("newPassword")
    user.hashed_password = pwd_context.hash(password)

    session.add(user)
    session.commit()
    session.refresh(user)

    return {"success": True, "message": "Password updated successfully"}


