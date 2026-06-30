class UserRole:
    USER = "user"
    ADMIN = "admin"


class DocumentStatus:
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    OCR_COMPLETED = "ocr_completed"
    TRANSLATED = "translated"
    FAILED = "failed"


ALLOWED_FILE_EXTENSIONS = {
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
    ".txt"
}


MAX_FILE_SIZE = 10 * 1024 * 1024  #10 MB max