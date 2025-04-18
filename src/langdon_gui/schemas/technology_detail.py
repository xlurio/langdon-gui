from typing import Self
import pydantic
from langdon_core import models as langdon_models

from langdon_gui.schemas.domain_item import DomainItem
from langdon_gui.schemas.ip_address_schema import IpAddressSchema
from langdon_gui.schemas.used_port_item import UsedPortWAddressItem


__all__ = ("TechnologyDetail",)


class WebDirectoryItem(pydantic.BaseModel):
    id: langdon_models.WebDirectoryId
    path: str
    ip_address: IpAddressSchema | None
    domain: DomainItem | None
    uses_ssl: bool
    screenshot_id: langdon_models.WebDirectoryScreenshotId | None

    @classmethod
    def from_web_directory_rel(
        cls, web_directory_rel: langdon_models.WebDirTechRel
    ) -> Self:
        ip_address = (
            IpAddressSchema(
                id=web_directory_rel.directory.ip_address.id,
                address=web_directory_rel.directory.ip_address.address,
                version=web_directory_rel.directory.ip_address.version,
            )
            if web_directory_rel.directory.ip_address
            else None
        )
        domain = (
            DomainItem(
                id=web_directory_rel.directory.domain.id,
                name=web_directory_rel.directory.domain.name,
            )
            if web_directory_rel.directory.domain
            else None
        )
        screenshot_id = (
            web_directory_rel.directory.screenshots[-1].id
            if web_directory_rel.directory.screenshots
            else None
        )

        return cls(
            id=web_directory_rel.directory.id,
            path=web_directory_rel.directory.path,
            ip_address=ip_address,
            domain=domain,
            uses_ssl=web_directory_rel.directory.uses_ssl,
            screenshot_id=screenshot_id,
        )


class VulnerabilityItem(pydantic.BaseModel):
    id: langdon_models.VulnerabilityId
    name: str


class TechnologyDetail(pydantic.BaseModel):
    id: langdon_models.TechnologyId
    name: str
    version: str
    used_ports: list[UsedPortWAddressItem]
    web_directories: list[WebDirectoryItem]
    vulnerabilities: list[VulnerabilityItem]

    @classmethod
    def from_technology_model(cls, technology: langdon_models.Technology) -> Self:
        return cls(
            id=technology.id,
            name=technology.name,
            version=technology.version,
            used_ports=UsedPortItemFactory.create_from_port_relationships(
                technology.port_relationships
            ),
            web_directories=WebDirectoryItemFactory.create_from_directory_relationships(
                technology.web_directory_relationships
            ),
            vulnerabilities=VulnerabilityItemFactory.create_from_vulnerabilities(
                technology.vulnerabilities
            ),
        )


class UsedPortItemFactory:
    @staticmethod
    def create_from_port_relationships(
        port_relationships: list[langdon_models.PortTechRel],
    ) -> list[UsedPortWAddressItem]:
        return [
            UsedPortWAddressItem.from_used_port_model(port_rel)
            for port_rel in port_relationships
        ]


class WebDirectoryItemFactory:
    @staticmethod
    def create_from_directory_relationships(
        directory_relationships: list[langdon_models.WebDirTechRel],
    ) -> list[WebDirectoryItem]:
        return [
            WebDirectoryItem.from_web_directory_rel(dir_rel)
            for dir_rel in directory_relationships
        ]


class VulnerabilityItemFactory:
    @staticmethod
    def create_from_vulnerabilities(
        vulnerabilities: list[langdon_models.Vulnerability],
    ) -> list[VulnerabilityItem]:
        return [
            VulnerabilityItem(id=vulnerability.id, name=vulnerability.name)
            for vulnerability in vulnerabilities
        ]
