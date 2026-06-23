import os
import uuid
import shutil

from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException
)

from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.auth.dependencies import get_current_user

from app.models.user import User

from app.schemas.document import (
    DocumentResponse,
    OCRResultResponse
)

from app.services.file_validation import (
    validate_file_type,
    validate_file_size
)

from app.services.document_service import (
    create_document,
    get_user_documents,
    get_document_by_id,
    delete_document,
    process_document_ocr,
    get_ocr_result,
    translate_document
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
def upload_document(
    title: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    validate_file_type(file)
    validate_file_size(file)

    file_extension = os.path.splitext(
        file.filename
    )[1]

    unique_filename = (
        f"{uuid.uuid4()}{file_extension}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    document = create_document(
        db=db,
        user_id=current_user.id,
        title=title,
        original_filename=file.filename,
        file_path=file_path
    )

    return {
        "message": "Document uploaded successfully",
        "document_id": document.id
    }


@router.get(
    "",
    response_model=list[DocumentResponse]
)
def list_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_user_documents(
        db,
        current_user.id
    )


@router.get(
    "/{document_id}",
    response_model=DocumentResponse
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return document


@router.get("/{document_id}/download")
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    if not os.path.exists(document.file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found on disk"
        )

    return FileResponse(
        path=document.file_path,
        filename=document.original_filename,
        media_type="application/octet-stream"
    )


@router.delete("/{document_id}")
def remove_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    delete_document(
        db,
        document
    )

    return {
        "message": "Document deleted successfully"
    }


@router.post("/{document_id}/process")
def process_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    document = process_document_ocr(
        db,
        document
    )

    return {
        "message": "OCR processing completed",
        "document_id": document.id,
        "status": document.status
    }

@router.post("/{document_id}/translate")
def translate_document_endpoint(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    try:

        document = translate_document(
            db,
            document
        )

        return {
            "message": "Translation completed",
            "document_id": document.id,
            "status": document.status
        }

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.get(
    "/{document_id}/ocr",
    response_model=OCRResultResponse
)
def get_document_ocr(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    document = get_document_by_id(
        db,
        document_id
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    if document.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return get_ocr_result(
        document
    )