from datetime import datetime

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    title: str
    original_filename: str
    file_path: str
    status: str
    uploaded_at: datetime

    class Config:
        from_attributes = True


class OCRResultResponse(BaseModel):
    document_id: int
    status: str

    ocr_text: str | None = None

    translated_text: str | None = None

    summary: str | None = None

    error_message: str | None = None