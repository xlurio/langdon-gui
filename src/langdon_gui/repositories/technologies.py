from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import func, orm, sql

if TYPE_CHECKING:
    from sqlalchemy.engine import ScalarResult
    from sqlalchemy.orm import Session


def count(*, session: Session) -> int:
    technologies_query = sql.select(func.count(langdon_models.Technology.id))
    technologies_count = session.execute(technologies_query).scalar_one()
    return technologies_count


def count_promissing_technologies(*, session: Session) -> int:
    technologies_query = sql.select(func.count(langdon_models.Technology.id)).where(
        langdon_models.Technology.version != None  # noqa: E711
    )
    technologies_count = session.execute(technologies_query).scalar_one()
    return technologies_count


def get_by_id(
    technology_id: langdon_models.TechnologyId, *, session: Session
) -> langdon_models.Technology:
    technologies_query = (
        sql.select(langdon_models.Technology)
        .distinct()
        .where(langdon_models.Technology.id == technology_id)
        .options(
            orm.selectinload(langdon_models.Technology.port_relationships)
            .selectinload(langdon_models.PortTechRel.port)
            .selectinload(langdon_models.UsedPort.ip_address),
            orm.selectinload(langdon_models.Technology.web_directory_relationships)
            .selectinload(langdon_models.WebDirTechRel.directory)
            .selectinload(langdon_models.WebDirectory.screenshots),
        )
        .join(langdon_models.WebDirectory.domain)
    )
    return session.execute(technologies_query).unique().scalar_one()


def list_by_web_directory_id(
    web_directory_id: langdon_models.WebDirectoryId, *, session: Session
) -> ScalarResult[langdon_models.Technology]:
    dir_tech_rel_query = sql.select(langdon_models.WebDirTechRel.technology_id).where(
        langdon_models.WebDirTechRel.directory_id == web_directory_id
    )
    technologies_query = (
        sql.select(langdon_models.Technology)
        .where(langdon_models.Technology.id.in_(dir_tech_rel_query))
        .order_by(langdon_models.Technology.name)
    )
    return session.scalars(technologies_query)


def list_promissing_technologies(
    *, session: Session, offset: int | None = None, limit: int | None = None
) -> ScalarResult[langdon_models.Technology]:
    technologies_query = (
        sql.select(langdon_models.Technology)
        .where(
            langdon_models.Technology.version != None  # noqa: E711
        )
        .order_by(langdon_models.Technology.id.desc())
    )

    if offset:
        technologies_query = technologies_query.offset(offset)
    if limit:
        technologies_query = technologies_query.limit(limit)

    return session.scalars(technologies_query)
