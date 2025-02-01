from datetime import datetime

from fastapi import APIRouter, Depends
from sqlmodel import select, Session

from auth.auth_middleware import JWTBearer

from db import SessionDep, get_session

from models import User

router = APIRouter()

@router.get("/get_profile", dependencies=[Depends(JWTBearer())])
def get_profile(user: dict = Depends(JWTBearer()), session: Session = Depends(get_session)):
    email = user.get("email")
    user = session.exec(select(User).where(User.email == email)).first()
    if not user:
        # raise HTTPException(status_code=400, detail="User not found")
        return {"success": False, "message": "User not found"}

    user_dict = {"full_name": user.full_name, "email": user.email, "is_admin": user.is_admin, "is_verified": user.is_verified}

    return {"success": True, "user": user_dict}


