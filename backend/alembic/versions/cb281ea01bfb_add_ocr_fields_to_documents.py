"""add_ocr_fields_to_documents

Revision ID: cb281ea01bfb
Revises: 6835c4bc608a
Create Date: 2026-06-22 04:03:35.585776

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "cb281ea01bfb"
down_revision: Union[str, Sequence[str], None] = "6835c4bc608a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.add_column(
        "documents",
        sa.Column(
            "ocr_text",
            sa.Text(),
            nullable=True
        )
    )

    op.add_column(
        "documents",
        sa.Column(
            "translated_text",
            sa.Text(),
            nullable=True
        )
    )

    op.add_column(
        "documents",
        sa.Column(
            "error_message",
            sa.Text(),
            nullable=True
        )
    )


def downgrade() -> None:

    op.drop_column(
        "documents",
        "error_message"
    )

    op.drop_column(
        "documents",
        "translated_text"
    )

    op.drop_column(
        "documents",
        "ocr_text"
    )