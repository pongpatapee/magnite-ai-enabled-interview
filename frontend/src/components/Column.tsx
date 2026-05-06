import { Droppable } from '@hello-pangea/dnd'
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
  onAddClick: (status: TicketStatus) => void
  onCardClick: (ticket: Ticket) => void
}

export default function Column({ status, tickets, onAddClick, onCardClick }: Props) {
  return (
    <div style={{ flex: 1, minWidth: 240, background: '#f4f5f7', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column' }}>
      <strong style={{ display: 'block', marginBottom: 12 }}>{LABELS[status]}</strong>
      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ flex: 1, minHeight: 40 }}>
            {tickets.map((t, i) => (
              <TicketCard key={t.id} ticket={t} index={i} onClick={onCardClick} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        onClick={() => onAddClick(status)}
        style={{ marginTop: 8, width: '100%', padding: '6px 0', cursor: 'pointer', border: '1px dashed #aaa', borderRadius: 4, background: 'transparent', color: '#555' }}
      >
        + Add ticket
      </button>
    </div>
  )
}
