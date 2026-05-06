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
