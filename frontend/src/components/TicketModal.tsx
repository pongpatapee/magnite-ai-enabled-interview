import { useState } from 'react'
import type { Ticket } from '../types'

interface Props {
  ticket?: Ticket
  onSave: (data: { title: string; description: string }) => void
  onDelete?: () => void
  onClose: () => void
}

export default function TicketModal({ ticket, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(ticket?.title ?? '')
  const [description, setDescription] = useState(ticket?.description ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim(), description: description.trim() })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, width: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
        <h2 style={{ marginTop: 0 }}>{ticket ? 'Edit Ticket' : 'New Ticket'}</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 12 }}>
            <span style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Title</span>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', boxSizing: 'border-box' }}
            />
          </label>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '6px 8px', boxSizing: 'border-box' }}
            />
          </label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
            {onDelete && (
              <button type="button" onClick={onDelete} style={{ color: '#c00', border: '1px solid #c00', background: 'transparent' }}>
                Delete
              </button>
            )}
            <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit" disabled={!title.trim()}>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
