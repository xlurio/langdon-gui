from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import func, sql

if TYPE_CHECKING:
    from sqlalchemy.orm import Session


def count(*, session: Session) -> int:
    http_cookies_query = sql.select(func.count(langdon_models.HttpCookie.id))
    http_cookies_count = session.execute(http_cookies_query).scalar_one()
    return http_cookies_count


def list_by_web_directory_id(
    web_directory_id: langdon_models.WebDirectoryId,
    *,
    session: Session,
) -> list[langdon_models.HttpCookie]:
    dir_cookie_rel_query = sql.select(langdon_models.DirCookieRel.cookie_id).where(
        langdon_models.DirCookieRel.directory_id == web_directory_id
    )
    cookies_query = (
        sql.select(langdon_models.HttpCookie)
        .where(langdon_models.HttpCookie.id.in_(dir_cookie_rel_query))
        .order_by(langdon_models.HttpCookie.name)
    )
    return session.scalars(cookies_query)
