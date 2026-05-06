from fastapi import APIRouter, Depends, HTTPException

from dependencies import get_ticket_service
from schemas.ticket import Ticket, CreateTicketRequest, UpdateTicketRequest
from services.ticket_service import TicketService

router = APIRouter()


@router.get("", response_model=list[Ticket])
def list_tickets(service: TicketService = Depends(get_ticket_service)):
    return service.list_tickets()


@router.post("", response_model=Ticket, status_code=201)
def create_ticket(body: CreateTicketRequest, service: TicketService = Depends(get_ticket_service)):
    return service.create_ticket(title=body.title, description=body.description, status=body.status, priority=body.priority)


@router.put("/{ticket_id}", response_model=Ticket)
def update_ticket(ticket_id: str, body: UpdateTicketRequest, service: TicketService = Depends(get_ticket_service)):
    try:
        return service.update_ticket(ticket_id, title=body.title, description=body.description, status=body.status, priority=body.priority)
    except ValueError:
        raise HTTPException(status_code=404, detail="Ticket not found")


@router.delete("/{ticket_id}", status_code=204)
def delete_ticket(ticket_id: str, service: TicketService = Depends(get_ticket_service)):
    try:
        service.delete_ticket(ticket_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Ticket not found")
