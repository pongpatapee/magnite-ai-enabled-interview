import uuid

from store.ticket_store import TicketStore
from schemas.ticket import Ticket, TicketStatus, PriorityLevel


class TicketService:
    def __init__(self, store: TicketStore) -> None:
        self._store = store

    def list_tickets(self) -> list[Ticket]:
        return self._store.get_all()

    def create_ticket(
        self,
        title: str,
        description: str,
        status: TicketStatus = TicketStatus.TODO,
        priority: PriorityLevel = PriorityLevel.MEDIUM,
    ) -> Ticket:
        ticket = Ticket(id=str(uuid.uuid4()), title=title, description=description, status=status, priority=priority)
        self._store.add(ticket)
        return ticket

    def update_ticket(
        self,
        ticket_id: str,
        title: str | None = None,
        description: str | None = None,
        status: TicketStatus | None = None,
        priority: PriorityLevel | None = None,
    ) -> Ticket:
        existing = self._store.get(ticket_id)
        if existing is None:
            raise ValueError(f"Ticket {ticket_id} not found")
        updated = existing.model_copy(update={
            k: v for k, v in {
                "title": title, "description": description,
                "status": status, "priority": priority,
            }.items()
            if v is not None
        })
        self._store.add(updated)
        return updated

    def delete_ticket(self, ticket_id: str) -> None:
        if self._store.get(ticket_id) is None:
            raise ValueError(f"Ticket {ticket_id} not found")
        self._store.remove(ticket_id)
