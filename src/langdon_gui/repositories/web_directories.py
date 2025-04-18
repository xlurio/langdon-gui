from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import func, sql, orm

from langdon_gui.constants import PROMISSING_DOMAIN_OR_CONTENT_KEYWORDS

if TYPE_CHECKING:
    from sqlalchemy.engine import ScalarResult
    from sqlalchemy.orm import Session

__all__ = ("count_promissing_web_directories", "list_promissing_web_directories")


def count(*, session: Session) -> int:
    web_directories_query = sql.select(func.count(langdon_models.WebDirectory.id))
    web_directories_count = session.execute(web_directories_query).scalar_one()
    return web_directories_count


def count_promissing_web_directories(*, session: Session) -> int:
    or_clauses = [
        langdon_models.WebDirectory.path.contains(interesting_keyword)
        for interesting_keyword in PROMISSING_DOMAIN_OR_CONTENT_KEYWORDS
    ]
    web_directories_query = sql.select(
        func.count(langdon_models.WebDirectory.id)
    ).where(sql.or_(*or_clauses))
    web_directories_count = session.execute(web_directories_query).scalar_one()
    return web_directories_count


def get_by_id(
    web_directory_id: langdon_models.WebDirectoryId, *, session: Session
) -> langdon_models.WebDirectory:
    web_directory_query = (
        sql.select(langdon_models.WebDirectory)
        .distinct()
        .join(langdon_models.WebDirectory.domain, isouter=True)
        .join(langdon_models.WebDirectory.ip_address, isouter=True)
        .options(
            orm.selectinload(langdon_models.WebDirectory.screenshots),
        )
        .where(langdon_models.WebDirectory.id == web_directory_id)
    )
    web_directory = session.execute(web_directory_query).scalar_one()
    return web_directory


def list_promissing_web_directories(
    *, session: Session, offset: int | None = None, limit: int | None = None
) -> ScalarResult[langdon_models.WebDirectory]:
    or_clauses = [
        langdon_models.WebDirectory.path.contains(interesting_keyword)
        for interesting_keyword in PROMISSING_DOMAIN_OR_CONTENT_KEYWORDS
    ]
    web_directories_query = (
        sql.select(langdon_models.WebDirectory)
        .distinct()
        .join(langdon_models.WebDirectory.domain, isouter=True)
        .join(langdon_models.WebDirectory.ip_address, isouter=True)
        .where(sql.or_(*or_clauses))
        .order_by(langdon_models.WebDirectory.id.desc())
    )

    if offset:
        web_directories_query.offset(offset)
    if limit:
        web_directories_query.limit(limit)

    return session.scalars(web_directories_query)


def count_by_ip_address_id(
    ip_address_id: langdon_models.IpAddressId, *, session: Session
) -> int:
    web_directories_query = (
        sql.select(func.count(langdon_models.WebDirectory.id))
        .where(langdon_models.WebDirectory.ip_id == ip_address_id)
        .order_by(langdon_models.WebDirectory.path)
    )
    web_directories_count = session.execute(web_directories_query).scalar_one()
    return web_directories_count


def list_by_ip_address_id(
    ip_address_id: langdon_models.IpAddressId,
    *,
    session: Session,
    offset: int | None = None,
    limit: int | None = None,
) -> ScalarResult[langdon_models.WebDirectory]:
    web_directories_query = (
        sql.select(langdon_models.WebDirectory)
        .where(langdon_models.WebDirectory.ip_id == ip_address_id)
        .order_by(langdon_models.WebDirectory.path)
    )

    if offset:
        web_directories_query = web_directories_query.offset(offset)
    if limit:
        web_directories_query = web_directories_query.limit(limit)

    return session.scalars(web_directories_query)
