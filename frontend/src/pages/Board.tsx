import { useEffect, useState } from 'react'
import type { Ticket, TicketStatus } from '../types'
import { getTickets, createTicket, updateTicket, deleteTicket } from '../api/tickets'
import Column from '../components/Column'
import TicketModal from '../components/TicketModal'

const STATUSES: TicketStatus[] = ['todo', 'in_progress', 'done']

export default function Board() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [createStatus, setCreateStatus] = useState<TicketStatus | null>(null)
  const [editing, setEditing] = useState<Ticket | null>(null)

  useEffect(() => {
    getTickets().then(setTickets)
  }, [])

  async function handleCreate(data: { title: string; description: string }) {
    const ticket = await createTicket({ ...data, status: createStatus ?? 'todo' })
    setTickets((prev) => [...prev, ticket])
    setCreateStatus(null)
  }

  async function handleUpdate(data: { title: string; description: string }) {
    if (!editing) return
    const updated = await updateTicket(editing.id, data)
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setEditing(null)
  }

  async function handleDelete() {
    if (!editing) return
    await deleteTicket(editing.id)
    setTickets((prev) => prev.filter((t) => t.id !== editing.id))
    setEditing(null)
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
            onAddClick={(s) => setCreateStatus(s)}
            onCardClick={(ticket) => setEditing(ticket)}
          />
        ))}
      </div>
      {createStatus !== null && (
        <TicketModal
          onSave={handleCreate}
          onClose={() => setCreateStatus(null)}
        />
      )}
      {editing && (
        <TicketModal
          ticket={editing}
          onSave={handleUpdate}
          onDelete={handleDelete}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
