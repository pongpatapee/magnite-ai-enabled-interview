import type { Ticket, TicketStatus } from '../types'
import TicketCard from './TicketCard'

const LABELS: Record<TicketStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

interface Props {
  status: TicketStatus
  tickets: Ticket[]
  onAddClick: () => void
  onCardClick: (ticket: Ticket) => void
}

export default function Column({ status, tickets, onAddClick, onCardClick }: Props) {
  return (
    <div style={{ flex: 1, minWidth: 240, background: '#f4f5f7', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <strong>{LABELS[status]}</strong>
        <button onClick={onAddClick} style={{ fontSize: 18, lineHeight: 1, cursor: 'pointer', border: 'none', background: 'none' }}>+</button>
      </div>
      {tickets.map((t) => (
        <TicketCard key={t.id} ticket={t} onClick={onCardClick} />
      ))}
    </div>
  )
}
