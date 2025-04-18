from typing import Self
from langdon_gui.schemas.ip_address_schema import IpAddressSchema
from langdon_gui.schemas.technology_item import TechnologyItem
from langdon_core import models as langdon_models
from langdon_gui.schemas.used_port_item import UsedPortWAddressItem


class UsedPortDetail(UsedPortWAddressItem):
    technologies: list[TechnologyItem]

    @classmethod
    def from_used_port_model(cls, used_port: langdon_models.UsedPort) -> Self:
        return cls(
            id=used_port.id,
            port=used_port.port,
            ip_address=IpAddressSchema(
                id=used_port.ip_address.id,
                address=used_port.ip_address.address,
                version=used_port.ip_address.version,
            ),
            technologies=[
                TechnologyItem(
                    id=tech_rel.technology_id,
                    name=tech_rel.technology.name,
                    version=tech_rel.technology.version,
                )
                for tech_rel in used_port.technology_relationships
            ],
        )
