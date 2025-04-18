from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import func, sql

if TYPE_CHECKING:
    from sqlalchemy.orm import Session


def count(*, session: Session) -> int:
    http_headers_query = sql.select(func.count(langdon_models.HttpHeader.id))
    http_headers_count = session.execute(http_headers_query).scalar_one()
    return http_headers_count


def list_by_web_directory_id(
    web_directory_id: langdon_models.WebDirectoryId,
    *,
    session: Session,
) -> list[langdon_models.HttpHeader]:
    dir_header_rel_query = sql.select(langdon_models.DirHeaderRel.header_id).where(
        langdon_models.DirHeaderRel.directory_id == web_directory_id
    )
    headers_query = sql.select(langdon_models.HttpHeader).where(
        langdon_models.HttpHeader.id.in_(dir_header_rel_query)
    )
    return session.scalars(headers_query)
