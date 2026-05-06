from schemas.ticket import Ticket


class TicketStore:
    def __init__(self) -> None:
        self._data: dict[str, Ticket] = {}

    def add(self, ticket: Ticket) -> None:
        self._data[ticket.id] = ticket

    def get_all(self) -> list[Ticket]:
        return list(self._data.values())
