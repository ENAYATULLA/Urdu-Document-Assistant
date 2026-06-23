import os

from fastapi import HTTPException, UploadFile

from app.core.constants import (
    ALLOWED_FILE_EXTENSIONS,
    MAX_FILE_SIZE
)


def validate_file_type(file: UploadFile):

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in ALLOWED_FILE_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"File type not allowed. "
                f"Allowed: {', '.join(ALLOWED_FILE_EXTENSIONS)}"
            )
        )


def validate_file_size(file: UploadFile):

    file.file.seek(0, 2)

    size = file.file.tell()

    file.file.seek(0)

    if size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 10 MB"
        )