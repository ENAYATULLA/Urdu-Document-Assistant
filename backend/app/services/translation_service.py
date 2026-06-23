from openai import OpenAI

from app.core.config import settings


def translate_urdu_to_english(
    text: str
) -> str:

    if not text:
        raise ValueError(
            "No OCR text available"
        )

    if not settings.OPENAI_API_KEY:
        raise ValueError(
            "OPENAI_API_KEY is not configured"
        )

    client = OpenAI(
        api_key=settings.OPENAI_API_KEY
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert Urdu translator. "
                    "Translate Urdu text into clear English. "
                    "Preserve the original meaning."
                )
            },
            {
                "role": "user",
                "content": text
            }
        ],
        temperature=0
    )

    return (
        response
        .choices[0]
        .message.content
        .strip()
    )