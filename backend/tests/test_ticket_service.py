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


def test_update_ticket_changes_title():
    service = make_service()
    ticket = service.create_ticket(title="Old", description="desc")
    updated = service.update_ticket(ticket.id, title="New")
    assert updated.title == "New"
    assert updated.description == "desc"
    assert updated.status == "todo"


def test_update_ticket_changes_status():
    service = make_service()
    ticket = service.create_ticket(title="T", description="")
    updated = service.update_ticket(ticket.id, status="in_progress")
    assert updated.status == "in_progress"
    assert updated.title == "T"


def test_update_ticket_persists_to_list():
    service = make_service()
    ticket = service.create_ticket(title="Old", description="")
    service.update_ticket(ticket.id, title="New")
    listed = service.list_tickets()
    assert listed[0].title == "New"


def test_update_ticket_unknown_id_raises():
    service = make_service()
    try:
        service.update_ticket("does-not-exist", title="X")
        assert False, "expected ValueError"
    except ValueError:
        pass


def test_delete_ticket_removes_from_list():
    service = make_service()
    ticket = service.create_ticket(title="T", description="")
    service.delete_ticket(ticket.id)
    assert service.list_tickets() == []


def test_delete_ticket_unknown_id_raises():
    service = make_service()
    try:
        service.delete_ticket("does-not-exist")
        assert False, "expected ValueError"
    except ValueError:
        pass
