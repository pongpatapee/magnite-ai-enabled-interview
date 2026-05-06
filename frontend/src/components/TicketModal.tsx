import { useState } from 'react'
import type { Ticket, TicketStatus } from '../types'

const STATUS_OPTIONS: { value: TicketStatus; label: string }[] = [
  { value: 'todo',        label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done',        label: 'Done' },
]

interface Props {
  ticket?: Ticket
  initialStatus?: TicketStatus
  onSave: (data: { title: string; description: string; status: TicketStatus }) => void
  onDelete?: () => void
  onClose: () => void
}

export default function TicketModal({ ticket, initialStatus = 'todo', onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(ticket?.title ?? '')
  const [description, setDescription] = useState(ticket?.description ?? '')
  const [status, setStatus] = useState<TicketStatus>(ticket?.status ?? initialStatus)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim(), description: description.trim(), status })
  }

  const fieldClass = 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-[440px] max-w-[calc(100vw-2rem)] p-7">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          {ticket ? 'Edit Ticket' : 'New Ticket'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600">Title</span>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TicketStatus)}
              className={fieldClass}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-600">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`${fieldClass} resize-none`}
            />
          </label>

          <div className="flex items-center justify-between mt-1">
            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="px-3.5 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
              >
                Delete
              </button>
            ) : <span />}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-3.5 py-1.5 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
