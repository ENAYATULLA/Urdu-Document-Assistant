import os
import pytesseract

from PIL import Image


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

    elif extension in [".png", ".jpg", ".jpeg"]:

        image = Image.open(file_path)

        text = pytesseract.image_to_string(
            image,
            lang="eng+urd"
        )

        return text

    elif extension == ".pdf":

        return "[PDF OCR COMING NEXT PHASE]"

    return "[UNSUPPORTED FILE TYPE]"