from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import func, sql, orm

if TYPE_CHECKING:
    from sqlalchemy.engine import ScalarResult
    from sqlalchemy.orm import Session


def count(*, session: Session) -> int:
    used_ports_query = sql.select(func.count(langdon_models.UsedPort.id))
    used_ports_count = session.execute(used_ports_query).scalar_one()
    return used_ports_count


def count_promissing_used_ports(*, session: Session) -> int:
    used_ports_query = (
        sql.select(func.count(langdon_models.UsedPort.id))
        .distinct()
        .join(langdon_models.UsedPort.ip_address)
        .where(
            sql.not_(
                sql.and_(
                    langdon_models.UsedPort.port.in_([80, 443]),
                    langdon_models.UsedPort.transport_layer_protocol == "tcp",
                )
            )
        )
    )
    used_ports_count = session.execute(used_ports_query).scalar_one()
    return used_ports_count


def list_promissing_used_ports(
    *, session: Session, offset: int | None = None, limit: int | None = None
) -> ScalarResult[langdon_models.UsedPort]:
    used_ports_query = (
        sql.select(langdon_models.UsedPort)
        .distinct()
        .join(langdon_models.UsedPort.ip_address)
        .where(
            sql.not_(
                sql.and_(
                    langdon_models.UsedPort.port.in_([80, 443]),
                    langdon_models.UsedPort.transport_layer_protocol == "tcp",
                )
            )
        )
        .order_by(langdon_models.UsedPort.port)
    )

    if offset is not None:
        used_ports_query = used_ports_query.offset(offset)
    if limit is not None:
        used_ports_query = used_ports_query.limit(limit)

    return session.execute(used_ports_query).scalars()


def list_by_ip_address_id(
    ip_address_id: langdon_models.IpAddressId,
    *,
    session: Session,
) -> ScalarResult[langdon_models.UsedPort]:
    used_ports_query = (
        sql.select(langdon_models.UsedPort)
        .where(langdon_models.UsedPort.ip_address_id == ip_address_id)
        .order_by(langdon_models.UsedPort.port)
    )
    return session.execute(used_ports_query).scalars()


def get_by_id(
    used_port_id: langdon_models.UsedPortId,
    *,
    session: Session,
) -> langdon_models.UsedPort:
    used_ports_query = (
        sql.select(langdon_models.UsedPort)
        .distinct()
        .where(langdon_models.UsedPort.id == used_port_id)
        .join(langdon_models.UsedPort.ip_address)
        .options(
            orm.joinedload(langdon_models.UsedPort.technology_relationships),
        )
        .join(langdon_models.PortTechRel.technology)
    )
    return session.execute(used_ports_query).unique().scalar_one()
