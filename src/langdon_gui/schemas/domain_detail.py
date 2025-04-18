from typing import Self
import pydantic
from langdon_core import models as langdon_models

from langdon_gui.schemas.ip_address_item import IpAddressItem


__all__ = ("DomainDetail",)


class WebDirectoryItem(pydantic.BaseModel):
    id: langdon_models.WebDirectoryId
    path: str
    uses_ssl: bool
    screenshot_id: langdon_models.WebDirectoryScreenshotId | None

    @classmethod
    def from_web_directory_model(
        cls, web_directory: langdon_models.WebDirectory
    ) -> Self:
        screenshot_id = (
            web_directory.screenshots[-1].id if web_directory.screenshots else None
        )

        return cls(
            id=web_directory.id,
            path=web_directory.path,
            uses_ssl=web_directory.uses_ssl,
            screenshot_id=screenshot_id,
        )


class DomainDetail(pydantic.BaseModel):
    id: langdon_models.DomainId
    name: str
    ip_addresses: list[IpAddressItem]
    web_directories: list[WebDirectoryItem]

    @classmethod
    def from_domain_model(cls, domain: langdon_models.Domain) -> Self:
        return cls(
            id=domain.id,
            name=domain.name,
            ip_addresses=[
                IpAddressItem(id=ip_rel.ip_id, address=ip_rel.ip_address.address)
                for ip_rel in domain.ip_relationships
            ],
            web_directories=[
                WebDirectoryItem.from_web_directory_model(directory)
                for directory in domain.web_directories
            ],
        )
