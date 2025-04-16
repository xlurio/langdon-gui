from typing import Self
import pydantic
from langdon_core import models as landgon_models


__all__ = ("TechnologyDetail",)


class IpAddressItem(pydantic.BaseModel):
    id: landgon_models.IpAddressId
    address: str


class UsedPortItem(pydantic.BaseModel):
    id: landgon_models.UsedPortId
    port: int
    ip_address: IpAddressItem

    @classmethod
    def from_used_port_model(cls, used_port: landgon_models.PortTechRel) -> Self:
        return cls(
            id=used_port.id,
            port=used_port.port.port,
            ip_address=IpAddressItem(
                id=used_port.port.ip_address.id,
                address=used_port.port.ip_address.address,
            ),
        )


class DomainItem(pydantic.BaseModel):
    id: landgon_models.DomainId
    name: str


class WebDirectoryItem(pydantic.BaseModel):
    id: landgon_models.WebDirectoryId
    path: str
    ip_address: IpAddressItem | None
    domain: DomainItem | None
    uses_ssl: bool

    @classmethod
    def from_web_directory_rel(
        cls, web_directory_rel: landgon_models.WebDirTechRel
    ) -> Self:
        ip_address = (
            IpAddressItem(
                id=web_directory_rel.directory.ip_address.id,
                address=web_directory_rel.directory.ip_address.address,
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

        return cls(
            id=web_directory_rel.directory.id,
            path=web_directory_rel.directory.path,
            ip_address=ip_address,
            domain=domain,
            uses_ssl=web_directory_rel.directory.uses_ssl,
        )


class VulnerabilityItem(pydantic.BaseModel):
    id: landgon_models.VulnerabilityId
    name: str


class TechnologyDetail(pydantic.BaseModel):
    id: landgon_models.TechnologyId
    name: str
    version: str
    used_ports: list[UsedPortItem]
    web_directories: list[WebDirectoryItem]
    vulnerabilities: list[VulnerabilityItem]

    @classmethod
    def from_technology_model(cls, technology: landgon_models.Technology) -> Self:
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
        port_relationships: list[landgon_models.PortTechRel],
    ) -> list[UsedPortItem]:
        return [
            UsedPortItem.from_used_port_model(port_rel)
            for port_rel in port_relationships
        ]


class WebDirectoryItemFactory:
    @staticmethod
    def create_from_directory_relationships(
        directory_relationships: list[landgon_models.WebDirTechRel],
    ) -> list[WebDirectoryItem]:
        return [
            WebDirectoryItem.from_web_directory_rel(dir_rel)
            for dir_rel in directory_relationships
        ]


class VulnerabilityItemFactory:
    @staticmethod
    def create_from_vulnerabilities(
        vulnerabilities: list[landgon_models.Vulnerability],
    ) -> list[VulnerabilityItem]:
        return [
            VulnerabilityItem(id=vulnerability.id, name=vulnerability.name)
            for vulnerability in vulnerabilities
        ]
