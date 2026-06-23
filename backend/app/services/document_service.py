from sqlalchemy.orm import Session

from app.models.document import Document
from app.core.constants import DocumentStatus

from app.services.ocr_service import extract_text
from app.services.translation_service import (
    translate_urdu_to_english
)


def create_document(
    db: Session,
    user_id: int,
    title: str,
    original_filename: str,
    file_path: str
):
    document = Document(
        user_id=user_id,
        title=title,
        original_filename=original_filename,
        file_path=file_path,
        status=DocumentStatus.UPLOADED
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_user_documents(
    db: Session,
    user_id: int
):
    return (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .all()
    )


def get_document_by_id(
    db: Session,
    document_id: int
):
    return (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )


def delete_document(
    db: Session,
    document: Document
):
    db.delete(document)
    db.commit()


def process_document_ocr(
    db: Session,
    document: Document
):

    text = extract_text(
        document.file_path
    )

    document.ocr_text = text

    document.status = (
        DocumentStatus.OCR_COMPLETED
    )

    db.commit()
    db.refresh(document)

    return document

def translate_document(
    db: Session,
    document: Document
):

    if not document.ocr_text:
        raise ValueError(
            "OCR must be completed first"
        )

    translated_text = (
        translate_urdu_to_english(
            document.ocr_text
        )
    )

    document.translated_text = (
        translated_text
    )

    document.status = (
        DocumentStatus.TRANSLATED
    )

    db.commit()
    db.refresh(document)

    return document
def get_ocr_result(
    document: Document
):

    return {
        "document_id": document.id,
        "status": document.status,
        "ocr_text": document.ocr_text,
        "translated_text": document.translated_text,
        "error_message": document.error_message
    }