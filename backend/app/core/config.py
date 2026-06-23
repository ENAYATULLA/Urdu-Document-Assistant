from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Urdu Document Assistant"

    DATABASE_URL: str = (
        "postgresql://postgres:postgres@db:5432/urdu_documents"
    )

    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()