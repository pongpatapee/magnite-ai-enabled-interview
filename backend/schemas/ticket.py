from enum import StrEnum

from pydantic import BaseModel


class TicketStatus(StrEnum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class Ticket(BaseModel):
    id: str
    title: str
    description: str
    status: TicketStatus


class CreateTicketRequest(BaseModel):
    title: str
    description: str
    status: TicketStatus = TicketStatus.TODO


class UpdateTicketRequest(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TicketStatus | None = None
