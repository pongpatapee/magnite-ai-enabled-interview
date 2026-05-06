import { Draggable } from '@hello-pangea/dnd'
import type { Ticket } from '../types'

interface Props {
  ticket: Ticket
  index: number
  onClick: (ticket: Ticket) => void
}

export default function TicketCard({ ticket, index, onClick }: Props) {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            border: '1px solid #ccc',
            borderRadius: 4,
            padding: '8px 12px',
            marginBottom: 8,
            cursor: 'grab',
            background: '#fff',
            ...provided.draggableProps.style,
          }}
          onClick={() => onClick(ticket)}
        >
          <strong>{ticket.title}</strong>
          {ticket.description && <p style={{ margin: '4px 0 0', fontSize: 13, color: '#555' }}>{ticket.description}</p>}
        </div>
      )}
    </Draggable>
  )
}
