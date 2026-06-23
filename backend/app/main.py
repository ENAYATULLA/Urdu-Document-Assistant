from fastapi import FastAPI

from app.auth.router import router as auth_router
from app.api.v1.document_router import (
    router as document_router
)

app = FastAPI(
    title="Urdu Document Assistant",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(document_router)


@app.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Urdu Document Assistant"
    }