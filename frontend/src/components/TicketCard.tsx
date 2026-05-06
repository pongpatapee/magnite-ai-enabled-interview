import { Draggable } from '@hello-pangea/dnd'
import type { Ticket, Priority } from '../types'

const PRIORITY_BADGE: Record<Priority, string> = {
  low:    'bg-slate-100 text-slate-500',
  medium: 'bg-amber-100 text-amber-600',
  high:   'bg-red-100 text-red-600',
}

interface Props {
  ticket: Ticket
  index: number
  onClick: (ticket: Ticket) => void
}

export default function TicketCard({ ticket, index, onClick }: Props) {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(ticket)}
          className={`bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 mb-2 cursor-pointer select-none transition-shadow duration-150 ${
            snapshot.isDragging ? 'shadow-lg rotate-1' : 'shadow-sm hover:shadow-md'
          }`}
          style={provided.draggableProps.style}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-gray-800 leading-snug">{ticket.title}</p>
            <span className={`shrink-0 text-xs font-medium rounded-full px-2 py-0.5 capitalize ${PRIORITY_BADGE[ticket.priority]}`}>
              {ticket.priority}
            </span>
          </div>
          {ticket.description && (
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{ticket.description}</p>
          )}
        </div>
      )}
    </Draggable>
  )
}
