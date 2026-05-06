import type { Ticket, TicketStatus, Priority } from '../types'

const STATUS_BADGE: Record<TicketStatus, { label: string; className: string }> = {
  todo:        { label: 'Todo',        className: 'bg-slate-100 text-slate-600' },
  in_progress: { label: 'In Progress', className: 'bg-amber-100 text-amber-700' },
  done:        { label: 'Done',        className: 'bg-green-100 text-green-700' },
}

const PRIORITY_BADGE: Record<Priority, { label: string; className: string }> = {
  low:    { label: 'Low',    className: 'bg-slate-100 text-slate-500' },
  medium: { label: 'Medium', className: 'bg-amber-100 text-amber-600' },
  high:   { label: 'High',   className: 'bg-red-100 text-red-600' },
}

interface Props {
  tickets: Ticket[]
  onCardClick: (ticket: Ticket) => void
}

export default function ListView({ tickets, onCardClick }: Props) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 text-sm">
        No tickets yet. Use "+ New" to create one.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <th className="px-5 py-3">Title</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Priority</th>
            <th className="px-5 py-3 hidden md:table-cell">Description</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const status = STATUS_BADGE[ticket.status]
            const priority = PRIORITY_BADGE[ticket.priority]
            return (
              <tr
                key={ticket.id}
                onClick={() => onCardClick(ticket)}
                className="border-b border-gray-50 last:border-none hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-3 font-medium text-gray-800">{ticket.title}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priority.className}`}>
                    {priority.label}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400 hidden md:table-cell max-w-xs truncate">
                  {ticket.description || '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
