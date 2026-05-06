import { Droppable } from '@hello-pangea/dnd'
import type { Ticket, TicketStatus } from '../types'
import TicketCard from './TicketCard'

const META: Record<TicketStatus, { label: string; accent: string; dot: string }> = {
  todo:        { label: 'Todo',        accent: '#e8eaed', dot: '#94a3b8' },
  in_progress: { label: 'In Progress', accent: '#fef3c7', dot: '#f59e0b' },
  done:        { label: 'Done',        accent: '#dcfce7', dot: '#22c55e' },
}

interface Props {
  status: TicketStatus
  tickets: Ticket[]
  onAddClick: (status: TicketStatus) => void
  onCardClick: (ticket: Ticket) => void
}

export default function Column({ status, tickets, onAddClick, onCardClick }: Props) {
  const { label, accent, dot } = META[status]
  return (
    <div style={{ flex: 1, minWidth: 260, maxWidth: 340, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
        padding: '0 4px',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: dot, flexShrink: 0 }} />
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-h)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          {label}
        </span>
        <span style={{
          marginLeft: 'auto', fontSize: 12, fontWeight: 600,
          background: accent, color: 'var(--text-h)',
          borderRadius: 12, padding: '1px 8px',
        }}>
          {tickets.length}
        </span>
      </div>

      {/* Drop zone */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: 1,
              minHeight: 80,
              borderRadius: 10,
              padding: 8,
              background: snapshot.isDraggingOver ? accent : 'var(--code-bg)',
              border: `2px dashed ${snapshot.isDraggingOver ? dot : 'transparent'}`,
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            {tickets.map((t, i) => (
              <TicketCard key={t.id} ticket={t} index={i} onClick={onCardClick} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add button */}
      <button
        onClick={() => onAddClick(status)}
        style={{
          marginTop: 8, width: '100%', padding: '7px 0',
          cursor: 'pointer', border: '1px dashed var(--border)',
          borderRadius: 8, background: 'transparent',
          color: 'var(--text)', fontSize: 13, fontWeight: 500,
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = dot; e.currentTarget.style.color = 'var(--text-h)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
      >
        + Add ticket
      </button>
    </div>
  )
}
