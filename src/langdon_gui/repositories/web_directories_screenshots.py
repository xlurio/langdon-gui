from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import sql


if TYPE_CHECKING:
    from sqlalchemy.orm import Session


def get_screenshot_by_web_directory_id(
    web_directory_id: langdon_models.WebDirectoryId, *, session: Session
) -> langdon_models.WebDirectoryScreenshot:
    """
    Get a screenshot by web directory ID.
    """
    screenshot_query = sql.select(langdon_models.WebDirectoryScreenshot).where(
        langdon_models.WebDirectoryScreenshot.directory_id == web_directory_id
    )
    return session.execute(screenshot_query).scalar_one()
