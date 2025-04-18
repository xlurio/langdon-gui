import pydantic
from langdon_core import models as langdon_models


class HttpHeaderItem(pydantic.BaseModel):
    id: langdon_models.HttpHeaderId
    name: str
