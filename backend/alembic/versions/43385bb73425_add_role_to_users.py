"""add role to users

Revision ID: 43385bb73425F
Revises:  "903c66f0b541"
Create Date: 2026-06-20 06:18:03.781669
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "43385bb73425"
down_revision: Union[str, Sequence[str], None] =  "903c66f0b541"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "role",
            sa.String(length=50),
            nullable=False,
            server_default="user"
        )
    )


def downgrade() -> None:
    op.drop_column("users", "role")