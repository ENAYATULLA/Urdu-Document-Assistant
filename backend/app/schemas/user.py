from pydantic import BaseModel, EmailStr


class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    is_active: bool

    class Config:
        from_attributes = True