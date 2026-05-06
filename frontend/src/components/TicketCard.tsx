import type { Ticket } from '../types'

interface Props {
  ticket: Ticket
  onClick: (ticket: Ticket) => void
}

export default function TicketCard({ ticket, onClick }: Props) {
  return (
    <div
      style={{ border: '1px solid #ccc', borderRadius: 4, padding: '8px 12px', marginBottom: 8, cursor: 'pointer', background: '#fff' }}
      onClick={() => onClick(ticket)}
    >
      <strong>{ticket.title}</strong>
      {ticket.description && <p style={{ margin: '4px 0 0', fontSize: 13, color: '#555' }}>{ticket.description}</p>}
    </div>
  )
}
