from services.ticket_service import TicketService
from store.ticket_store import TicketStore


def make_service() -> TicketService:
    return TicketService(store=TicketStore())


def test_list_tickets_empty():
    service = make_service()
    assert service.list_tickets() == []


def test_create_ticket_returns_ticket_with_correct_fields():
    service = make_service()
    ticket = service.create_ticket(title="Fix bug", description="It crashes")
    assert ticket.title == "Fix bug"
    assert ticket.description == "It crashes"
    assert ticket.status == "todo"
    assert ticket.id != ""


def test_create_ticket_assigns_unique_ids():
    service = make_service()
    t1 = service.create_ticket(title="A", description="")
    t2 = service.create_ticket(title="B", description="")
    assert t1.id != t2.id


def test_list_tickets_returns_all_created():
    service = make_service()
    t1 = service.create_ticket(title="A", description="")
    t2 = service.create_ticket(title="B", description="")
    tickets = service.list_tickets()
    assert len(tickets) == 2
    ids = {t.id for t in tickets}
    assert t1.id in ids
    assert t2.id in ids
