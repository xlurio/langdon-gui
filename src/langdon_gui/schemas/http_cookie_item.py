import pydantic
from langdon_core import models as langdon_models


class HttpCookieItem(pydantic.BaseModel):
    id: langdon_models.HttpCookieId
    name: str
