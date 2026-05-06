from typing import Literal
from pydantic import BaseModel


class Ticket(BaseModel):
    id: str
    title: str
    description: str
    status: Literal["todo", "in_progress", "done"]


class CreateTicketRequest(BaseModel):
    title: str
    description: str
    status: Literal["todo", "in_progress", "done"] = "todo"


class UpdateTicketRequest(BaseModel):
    title: str | None = None
    description: str | None = None
    status: Literal["todo", "in_progress", "done"] | None = None
