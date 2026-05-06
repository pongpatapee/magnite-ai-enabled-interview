import uuid

from store.ticket_store import TicketStore
from schemas.ticket import Ticket


class TicketService:
    def __init__(self, store: TicketStore) -> None:
        self._store = store

    def list_tickets(self) -> list[Ticket]:
        return self._store.get_all()

    def create_ticket(self, title: str, description: str) -> Ticket:
        ticket = Ticket(id=str(uuid.uuid4()), title=title, description=description, status="todo")
        self._store.add(ticket)
        return ticket
