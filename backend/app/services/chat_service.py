import requests


OLLAMA_URL = (
    "http://host.docker.internal:11434/api/generate"
)

OLLAMA_MODEL = "qwen2.5:3b"


def ask_document(
    document_text: str,
    question: str
) -> str:

    if not document_text:
        raise ValueError(
            "No translated document available"
        )

    if not question:
        raise ValueError(
            "Question is required"
        )

    print("\n" + "=" * 80)
    print("DOCUMENT SENT TO OLLAMA")
    print("=" * 80)
    print(document_text)
    print("=" * 80)

    print("\nQUESTION:")
    print(question)
    print("=" * 80)

    prompt = f"""
You are an AI Document Assistant.

You MUST answer ONLY using the document below.

Rules:
- Answer ONLY from the document.
- Do NOT use outside knowledge.
- Do NOT guess.
- If the answer is missing, reply exactly:
The document does not contain this information.
- Keep the answer short and clear.

================ DOCUMENT ================

{document_text}

================ QUESTION ================

{question}

================ ANSWER ================
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

    response.raise_for_status()

    print("\n" + "=" * 80)
    print("RAW OLLAMA RESPONSE")
    print("=" * 80)
    print(response.text)
    print("=" * 80)

    result = response.json()

    print("\nPARSED JSON:")
    print(result)

    answer = result.get(
        "response",
        ""
    ).strip()

    print("\nFINAL ANSWER:")
    print(repr(answer))
    print("=" * 80)

    if not answer:
        answer = (
            "The document does not contain this information."
        )

    return answer