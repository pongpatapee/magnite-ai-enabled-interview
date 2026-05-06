import type { Ticket, TicketStatus } from '../types'
import Column from './Column'

const STATUSES: TicketStatus[] = ['todo', 'in_progress', 'done']

interface Props {
  tickets: Ticket[]
  onAddClick: (status: TicketStatus) => void
  onCardClick: (ticket: Ticket) => void
}

export default function BoardView({ tickets, onAddClick, onCardClick }: Props) {
  return (
    <div className="flex gap-4 items-start">
      {STATUSES.map((status) => (
        <Column
          key={status}
          status={status}
          tickets={tickets.filter((t) => t.status === status)}
          onAddClick={onAddClick}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  )
}
