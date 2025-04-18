import pydantic


class ListResponse(pydantic.BaseModel):
    count: int
    next: int | None
    results: list
