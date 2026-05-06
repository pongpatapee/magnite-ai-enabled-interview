import { Draggable } from '@hello-pangea/dnd'
import { useState } from 'react'
import type { Ticket } from '../types'

interface Props {
  ticket: Ticket
  index: number
  onClick: (ticket: Ticket) => void
}

export default function TicketCard({ ticket, index, onClick }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(ticket)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 8,
            cursor: 'pointer',
            boxShadow: snapshot.isDragging
              ? '0 8px 24px rgba(0,0,0,0.15)'
              : hovered
                ? '0 2px 8px rgba(0,0,0,0.08)'
                : '0 1px 2px rgba(0,0,0,0.04)',
            transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
            transition: 'box-shadow 0.15s, transform 0.15s',
            ...provided.draggableProps.style,
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: 'var(--text-h)', lineHeight: 1.4 }}>
            {ticket.title}
          </p>
          {ticket.description && (
            <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>
              {ticket.description}
            </p>
          )}
        </div>
      )}
    </Draggable>
  )
}
