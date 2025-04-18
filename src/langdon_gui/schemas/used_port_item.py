from typing import Self
from langdon_core import models as langdon_models
import pydantic

from langdon_gui.schemas.ip_address_schema import IpAddressSchema


class UsedPortItem(pydantic.BaseModel):
    id: langdon_models.UsedPortId
    port: int


class UsedPortWAddressItem(UsedPortItem):
    ip_address: IpAddressSchema

    @classmethod
    def from_used_port_model(cls, used_port: langdon_models.PortTechRel) -> Self:
        return cls(
            id=used_port.id,
            port=used_port.port.port,
            ip_address=IpAddressSchema(
                id=used_port.port.ip_address.id,
                address=used_port.port.ip_address.address,
            ),
        )
