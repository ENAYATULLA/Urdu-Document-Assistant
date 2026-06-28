import requests

OLLAMA_URL = (
    "http://host.docker.internal:11434/api/generate"
)

OLLAMA_MODEL = "qwen2.5:3b"


def translate_chunk(text: str) -> str:

    prompt = f"""
Translate the following Urdu text into clear English.

Rules:
- Only return the English translation.
- Do not explain.
- Do not add notes.
- Preserve original meaning.

Urdu Text:
{text}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        },
        timeout=600
    )

    if response.status_code != 200:
        raise ValueError(
            f"Ollama error: {response.text}"
        )

    result = response.json()

    return (
        result["response"]
        .strip()
    )


def translate_urdu_to_english(
    text: str
) -> str:

    if not text:
        raise ValueError(
            "No OCR text available"
        )

    # Large OCR text ko chhote parts mein divide karo
    chunk_size = 1000

    chunks = [
        text[i:i + chunk_size]
        for i in range(
            0,
            len(text),
            chunk_size
        )
    ]

    translations = []

    for chunk in chunks:
        translated = translate_chunk(
            chunk
        )
        translations.append(
            translated
        )

    return "\n".join(
        translations
    )