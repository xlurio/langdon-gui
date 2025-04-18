import pydantic
from langdon_core import models as langdon_models


class IpAddressSchema(pydantic.BaseModel):
    id: langdon_models.IpAddressId
    address: str
    version: langdon_models.IpAddressVersionT
