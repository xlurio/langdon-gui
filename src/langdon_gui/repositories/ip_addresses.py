from __future__ import annotations

from typing import TYPE_CHECKING

from langdon_core import models as langdon_models
from sqlalchemy import func, sql

if TYPE_CHECKING:
    from sqlalchemy.orm import Session


def count(*, session: Session) -> int:
    ip_addresses_query = sql.select(func.count(langdon_models.IpAddress.id))
    ip_addresses_count = session.execute(ip_addresses_query).scalar_one()
    return ip_addresses_count


def get_by_id(
    ip_address_id: langdon_models.IpAddressId, *, session: Session
) -> langdon_models.IpAddress:
    ip_address_query = sql.select(langdon_models.IpAddress).where(
        langdon_models.IpAddress.id == ip_address_id
    )
    ip_address = session.execute(ip_address_query).scalar_one()

    return ip_address
