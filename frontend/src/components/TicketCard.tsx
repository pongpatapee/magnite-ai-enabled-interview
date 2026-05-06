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
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(ticket)}
          className={`bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 mb-2 cursor-pointer select-none transition-shadow duration-150 ${
            snapshot.isDragging
              ? 'shadow-lg rotate-1'
              : 'shadow-sm hover:shadow-md'
          }`}
          style={provided.draggableProps.style}
        >
          <p className="text-sm font-semibold text-gray-800 leading-snug">{ticket.title}</p>
          {ticket.description && (
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{ticket.description}</p>
          )}
        </div>
      )}
    </Draggable>
  )
}
