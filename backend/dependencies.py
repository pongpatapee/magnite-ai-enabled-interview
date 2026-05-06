from functools import lru_cache

from store.ticket_store import TicketStore
from services.ticket_service import TicketService


@lru_cache(maxsize=1)
def get_ticket_store() -> TicketStore:
    return TicketStore()


def get_ticket_service() -> TicketService:
    return TicketService(store=get_ticket_store())
