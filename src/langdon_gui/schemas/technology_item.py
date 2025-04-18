import pydantic
from langdon_core import models as langdon_models


class TechnologyItem(pydantic.BaseModel):
    id: langdon_models.TechnologyId
    name: str
    version: str | None
