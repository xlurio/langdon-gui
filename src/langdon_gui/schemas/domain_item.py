import pydantic
from langdon_core import models as langdon_models


class DomainItem(pydantic.BaseModel):
    id: langdon_models.DomainId
    name: str
