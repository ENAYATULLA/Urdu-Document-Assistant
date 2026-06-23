from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Text
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    title = Column(
        String(255),
        nullable=False
    )

    original_filename = Column(
        String(500),
        nullable=False
    )

    file_path = Column(
        String(1000),
        nullable=False
    )

    status = Column(
        String(50),
        nullable=False,
        default="uploaded"
    )

    ocr_text = Column(
        Text,
        nullable=True
    )

    translated_text = Column(
        Text,
        nullable=True
    )

    error_message = Column(
        Text,
        nullable=True
    )

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    owner = relationship(
        "User",
        back_populates="documents"
    )