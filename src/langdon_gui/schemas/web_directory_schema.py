from typing import Self
import pydantic
from langdon_core import models as langdon_models

from langdon_gui.schemas.domain_item import DomainItem
from langdon_gui.schemas.ip_address_schema import IpAddressSchema


class WebDirectorySchema(pydantic.BaseModel):
    id: langdon_models.WebDirectoryId
    path: str
    uses_ssl: bool
    screenshot_id: langdon_models.WebDirectoryScreenshotId | None

    @classmethod
    def from_web_directory_model(
        cls, web_directory: langdon_models.WebDirectory
    ) -> Self:
        screenshot_id = (
            web_directory.screenshot.id if web_directory.screenshot else None
        )

        return cls(
            id=web_directory.id,
            path=web_directory.path,
            uses_ssl=web_directory.uses_ssl,
            screenshot_id=screenshot_id,
        )


class WebDirectoryWDomainNIpSchema(WebDirectorySchema):
    domain: DomainItem | None
    ip_address: IpAddressSchema | None

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
            ip_address=IpAddressSchema(
                id=web_directory.ip_id,
                address=web_directory.ip_address.address,
                version=web_directory.ip_address.version,
            )
            if web_directory.ip_address
            else None,
            screenshot_id=web_directory.screenshot.id
            if web_directory.screenshot
            else None,
        )
