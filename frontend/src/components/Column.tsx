import { Droppable } from '@hello-pangea/dnd'
import type { Ticket, TicketStatus } from '../types'
import TicketCard from './TicketCard'

const META: Record<TicketStatus, { label: string; dotClass: string; badgeClass: string }> = {
  todo:        { label: 'Todo',        dotClass: 'bg-slate-400',  badgeClass: 'bg-slate-100 text-slate-600' },
  in_progress: { label: 'In Progress', dotClass: 'bg-amber-400',  badgeClass: 'bg-amber-100 text-amber-700' },
  done:        { label: 'Done',        dotClass: 'bg-green-400',  badgeClass: 'bg-green-100 text-green-700' },
}

interface Props {
  status: TicketStatus
  tickets: Ticket[]
  onAddClick: (status: TicketStatus) => void
  onCardClick: (ticket: Ticket) => void
}

export default function Column({ status, tickets, onAddClick, onCardClick }: Props) {
  const { label, dotClass, badgeClass } = META[status]

  return (
    <div className="flex flex-col flex-1 min-w-60 max-w-80">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotClass}`} />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        <span className={`ml-auto text-xs font-semibold rounded-full px-2 py-0.5 ${badgeClass}`}>
          {tickets.length}
        </span>
      </div>

      {/* Drop zone */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-20 rounded-xl p-2 transition-colors duration-150 ${
              snapshot.isDraggingOver ? 'bg-violet-50 ring-2 ring-violet-200' : 'bg-gray-100'
            }`}
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
        className="mt-2 w-full py-2 text-sm font-medium text-gray-400 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-600 transition-colors duration-150"
      >
        + Add ticket
      </button>
    </div>
  )
}
