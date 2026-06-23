from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password, verify_password, create_access_token


def register_user(db: Session, full_name: str, email: str, password: str):

    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise Exception("User already exists")

    user = User(
        full_name=full_name,
        email=email,
        hashed_password=hash_password(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, email: str, password: str):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user


def generate_token(user: User):
    return create_access_token(
        data={
            "sub": str(user.id),
            "email": user.email,
            "role": user.role   # NEW
        }
    )