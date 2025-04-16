import pydantic
from langdon_core import models as langdon_models


class IpAddressItem(pydantic.BaseModel):
    id: langdon_models.IpAddressId
    address: str