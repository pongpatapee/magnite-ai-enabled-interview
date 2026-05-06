from enum import StrEnum

from pydantic import BaseModel


class TicketStatus(StrEnum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class PriorityLevel(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Ticket(BaseModel):
    id: str
    title: str
    description: str
    status: TicketStatus
    priority: PriorityLevel = PriorityLevel.MEDIUM


class CreateTicketRequest(BaseModel):
    title: str
    description: str
    status: TicketStatus = TicketStatus.TODO
    priority: PriorityLevel = PriorityLevel.MEDIUM


class UpdateTicketRequest(BaseModel):
    title: str | None = None
    description: str | None = None
    status: TicketStatus | None = None
    priority: PriorityLevel | None = None
