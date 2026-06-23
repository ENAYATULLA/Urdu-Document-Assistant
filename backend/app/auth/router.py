from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.auth.service import (
    register_user,
    authenticate_user,
    generate_token
)

from app.auth.dependencies import (
    get_current_user,
    require_admin
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register")
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):
    try:
        user = register_user(
            db,
            payload.full_name,
            payload.email,
            payload.password
        )

        token = generate_token(user)

        return {
            "message": "User created",
            "access_token": token
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login", response_model=TokenResponse)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        payload.email,
        payload.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = generate_token(user)

    return TokenResponse(
        access_token=token
    )


@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role
    }


@router.get("/admin")
def admin_dashboard(
    current_user=Depends(require_admin)
):
    return {
        "message": "Welcome Admin",
        "user": current_user.email,
        "role": current_user.role
    }