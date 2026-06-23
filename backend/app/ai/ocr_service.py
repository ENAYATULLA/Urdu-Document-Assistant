import os

from PIL import Image
import pytesseract


def extract_text(file_path: str) -> str:

    extension = os.path.splitext(
        file_path
    )[1].lower()

    if extension == ".txt":

        with open(
            file_path,
            "r",
            encoding="utf-8",
            errors="ignore"
        ) as file:

            return file.read()

    elif extension == ".pdf":
        return "[PDF OCR NOT IMPLEMENTED YET]"

    elif extension in [".png", ".jpg", ".jpeg"]:

        try:

            image = Image.open(file_path)

            extracted_text = (
                pytesseract.image_to_string(
                    image,
                    lang="urd+eng"
                )
            )

            return extracted_text.strip()

        except Exception as e:

            return f"[OCR ERROR] {str(e)}"

    return "[UNSUPPORTED FILE TYPE]"