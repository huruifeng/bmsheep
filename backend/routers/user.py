from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select, Session

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


