import os
import cv2
import fitz
import numpy as np
import pytesseract
import easyocr


# Load only once
reader = easyocr.Reader(
    ["ur"],
    gpu=False
)


def preprocess_image(file_path: str):

    image = cv2.imread(file_path)

    if image is None:
        raise ValueError(
            f"Unable to read image: {file_path}"
        )

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # Light blur only
    gray = cv2.GaussianBlur(
        gray,
        (3, 3),
        0
    )

    # Adaptive threshold
    gray = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        11
    )

    # Smaller resize for better speed
    gray = cv2.resize(
        gray,
        None,
        fx=2,
        fy=2,
        interpolation=cv2.INTER_CUBIC
    )

    return gray


def clean_text(text: str):

    text = text.replace(
        "\n",
        " "
    )

    text = " ".join(
        text.split()
    )

    return text.strip()


def run_tesseract(image):

    config = (
        "--oem 3 "
        "--psm 6 "
        "-c preserve_interword_spaces=1"
    )

    text = pytesseract.image_to_string(
        image,
        lang="urd",
        config=config
    )

    return clean_text(text)


def run_easyocr(image):

    results = reader.readtext(
        image,
        detail=0,
        paragraph=True
    )

    text = " ".join(results)

    return clean_text(text)


def extract_text_from_pdf(
    file_path: str
):
    """
    First try direct text extraction.
    If no text exists, use OCR.
    """

    document = fitz.open(
        file_path
    )

    all_text = []

    for page_number in range(
        len(document)
    ):

        print(
            f"Processing PDF Page {page_number + 1}",
            flush=True
        )

        page = document.load_page(
            page_number
        )

        # Direct extraction first
        page_text = (
            page.get_text()
            .strip()
        )

        if page_text:

            print(
                f"PDF Page {page_number + 1}: Direct text extracted",
                flush=True
            )

            all_text.append(
                clean_text(page_text)
            )

            continue

        print(
            f"PDF Page {page_number + 1}: OCR started",
            flush=True
        )

        # Lower DPI for speed
        pix = page.get_pixmap(
            dpi=180
        )

        temp_image = (
            f"temp_page_{page_number}.png"
        )

        pix.save(
            temp_image
        )

        try:

            processed = preprocess_image(
                temp_image
            )

            # Run Tesseract first
            tesseract_text = (
                run_tesseract(
                    processed
                )
            )

            # EasyOCR only if needed
            if len(
                tesseract_text.strip()
            ) > 20:

                page_text = (
                    tesseract_text
                )

                print(
                    f"Using Tesseract result",
                    flush=True
                )

            else:

                print(
                    f"Tesseract weak, running EasyOCR",
                    flush=True
                )

                page_text = (
                    run_easyocr(
                        processed
                    )
                )

            print(
                f"PDF Page {page_number + 1} OCR completed",
                flush=True
            )

            all_text.append(
                page_text
            )

        except Exception as e:

            print(
                f"PDF OCR Error: {e}",
                flush=True
            )

        finally:

            if os.path.exists(
                temp_image
            ):
                os.remove(
                    temp_image
                )

    document.close()

    return "\n".join(
        all_text
    )


def extract_text(
    file_path: str
):

    extension = os.path.splitext(
        file_path
    )[1].lower()

    if extension == ".txt":

        with open(
            file_path,
            "r",
            encoding="utf-8",
            errors="ignore"
        ) as f:

            return clean_text(
                f.read()
            )

    if extension in [
        ".png",
        ".jpg",
        ".jpeg"
    ]:

        processed = preprocess_image(
            file_path
        )

        tesseract_text = (
            run_tesseract(
                processed
            )
        )

        # EasyOCR only if Tesseract failed
        if len(
            tesseract_text.strip()
        ) > 20:
            return tesseract_text

        return run_easyocr(
            processed
        )

    if extension == ".pdf":

        return extract_text_from_pdf(
            file_path
        )

    return "[UNSUPPORTED FILE TYPE]"