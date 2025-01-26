from fastapi import APIRouter, Depends
from auth.auth_middleware import JWTBearer

router = APIRouter()

@router.get("/dashboard", dependencies=[Depends(JWTBearer())])
def dashboard(user: dict = Depends(JWTBearer())):
    return {"message": f"Welcome, user {user['sub']}"}
