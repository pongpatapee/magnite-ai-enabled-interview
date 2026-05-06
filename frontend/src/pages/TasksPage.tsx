import { useEffect, useState } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import type { Ticket, TicketStatus } from '../types'
import { getTickets, createTicket, updateTicket, deleteTicket } from '../api/tickets'
import BoardView from '../components/BoardView'
import ListView from '../components/ListView'
import TicketModal from '../components/TicketModal'

type View = 'board' | 'list'

export default function TasksPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [view, setView] = useState<View>('board')
  const [createStatus, setCreateStatus] = useState<TicketStatus | null>(null)
  const [editing, setEditing] = useState<Ticket | null>(null)

  useEffect(() => {
    getTickets().then(setTickets)
  }, [])

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return
    const { draggableId, destination } = result
    const newStatus = destination.droppableId as TicketStatus
    const ticket = tickets.find((t) => t.id === draggableId)
    if (!ticket || ticket.status === newStatus) return

    setTickets((prev) => prev.map((t) => (t.id === draggableId ? { ...t, status: newStatus } : t)))
    await updateTicket(draggableId, { status: newStatus })
  }

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
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Task Board</h1>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-medium">
            {(['board', 'list'] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 capitalize transition-colors ${
                  view === v ? 'bg-violet-500 text-white' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCreateStatus('todo')}
            className="px-3.5 py-1.5 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors"
          >
            + New
          </button>
        </div>
      </header>

      <main className="p-8">
        {view === 'board' ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <BoardView
              tickets={tickets}
              onAddClick={(s) => setCreateStatus(s)}
              onCardClick={(t) => setEditing(t)}
            />
          </DragDropContext>
        ) : (
          <ListView tickets={tickets} onCardClick={(t) => setEditing(t)} />
        )}
      </main>

      {createStatus !== null && (
        <TicketModal onSave={handleCreate} onClose={() => setCreateStatus(null)} />
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
