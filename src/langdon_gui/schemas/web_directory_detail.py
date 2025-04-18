from typing import Self
import pydantic
from langdon_core import models as langdon_models

from langdon_gui.schemas.domain_item import DomainItem
from langdon_gui.schemas.ip_address_item import IpAddressItem


__all__ = ("WebDirectoryDetail",)


class WebDirectoryDetail(pydantic.BaseModel):
    id: langdon_models.WebDirectoryId
    path: str
    domain: DomainItem | None
    ip_address: IpAddressItem | None
    uses_ssl: bool
    screenshot_id: langdon_models.WebDirectoryScreenshotId | None

    @classmethod
    def from_web_directory_model(
        cls, web_directory: langdon_models.WebDirectory
    ) -> Self:
        return cls(
            id=web_directory.id,
            path=web_directory.path,
            domain=DomainItem(
                id=web_directory.domain_id, name=web_directory.domain.name
            )
            if web_directory.domain
            else None,
            uses_ssl=web_directory.uses_ssl,
            ip_address=IpAddressItem(
                id=web_directory.ip_id,
                address=web_directory.ip_address.address,
            )
            if web_directory.ip_address
            else None,
            screenshot_id=web_directory.screenshots[-1].id
            if web_directory.screenshots
            else None,
        )
