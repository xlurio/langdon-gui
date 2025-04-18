from typing import Self
import pydantic
from langdon_core import models as langdon_models

from langdon_gui.schemas.ip_address_schema import IpAddressSchema
from langdon_gui.schemas.web_directory_schema import WebDirectorySchema


__all__ = ("DomainDetail",)


class DomainDetail(pydantic.BaseModel):
    id: langdon_models.DomainId
    name: str
    ip_addresses: list[IpAddressSchema]
    web_directories: list[WebDirectorySchema]

    @classmethod
    def from_domain_model(cls, domain: langdon_models.Domain) -> Self:
        return cls(
            id=domain.id,
            name=domain.name,
            ip_addresses=[
                IpAddressSchema(
                    id=ip_rel.ip_id,
                    address=ip_rel.ip_address.address,
                    version=ip_rel.ip_address.version,
                )
                for ip_rel in domain.ip_relationships
            ],
            web_directories=[
                WebDirectorySchema.from_web_directory_model(directory)
                for directory in domain.web_directories
            ],
        )
