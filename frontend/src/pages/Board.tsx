import { useEffect, useState } from 'react'
import type { Ticket, TicketStatus } from '../types'
import { getTickets, createTicket } from '../api/tickets'
import Column from '../components/Column'
import TicketModal from '../components/TicketModal'

const STATUSES: TicketStatus[] = ['todo', 'in_progress', 'done']

export default function Board() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getTickets().then(setTickets)
  }, [])

  async function handleCreate(data: { title: string; description: string }) {
    const ticket = await createTicket(data)
    setTickets((prev) => [...prev, ticket])
    setShowModal(false)
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Board</h1>
      <div style={{ display: 'flex', gap: 16 }}>
        {STATUSES.map((status) => (
          <Column
            key={status}
            status={status}
            tickets={tickets.filter((t) => t.status === status)}
            onAddClick={() => setShowModal(true)}
            onCardClick={() => {}}
          />
        ))}
      </div>
      {showModal && (
        <TicketModal
          onSave={handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
