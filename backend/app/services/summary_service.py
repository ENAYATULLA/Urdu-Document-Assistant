import requests


OLLAMA_URL = (
    "http://host.docker.internal:11434/api/generate"
)

OLLAMA_MODEL = "qwen2.5:3b"


def generate_summary(
    text: str
) -> str:

    if not text:
        raise ValueError(
            "No translated text available"
        )

    prompt = f"""
Summarize the following English text.

Rules:
- Return only the summary.
- Keep it between 5 and 8 sentences.
- Preserve the important information.
- Do not add information that is not present.

Text:
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