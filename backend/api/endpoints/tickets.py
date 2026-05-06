from fastapi import APIRouter, Depends

from dependencies import get_ticket_service
from schemas.ticket import Ticket, CreateTicketRequest
from services.ticket_service import TicketService

router = APIRouter()


@router.get("", response_model=list[Ticket])
def list_tickets(service: TicketService = Depends(get_ticket_service)):
    return service.list_tickets()


@router.post("", response_model=Ticket, status_code=201)
def create_ticket(body: CreateTicketRequest, service: TicketService = Depends(get_ticket_service)):
    return service.create_ticket(title=body.title, description=body.description)
