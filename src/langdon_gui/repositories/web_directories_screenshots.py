from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import sql


if TYPE_CHECKING:
    from sqlalchemy.orm import Session


def get_by_id(
    screenshot_id: langdon_models.WebDirectoryScreenshotId, *, session: Session
) -> langdon_models.WebDirectoryScreenshot:
    """
    Get a screenshot by web directory ID.
    """
    screenshot_query = sql.select(langdon_models.WebDirectoryScreenshot).where(
        langdon_models.WebDirectoryScreenshot.id == screenshot_id
    )
    return session.execute(screenshot_query).scalar_one()
