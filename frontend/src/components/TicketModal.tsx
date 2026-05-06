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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 10px',
    border: '1px solid var(--border)', borderRadius: 6,
    background: 'var(--bg)', color: 'var(--text-h)',
    fontSize: 14, outline: 'none',
    transition: 'border-color 0.15s',
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'var(--bg)', borderRadius: 12,
        padding: '28px 28px 24px',
        width: 440, maxWidth: 'calc(100vw - 32px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        border: '1px solid var(--border)',
      }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 600, color: 'var(--text-h)' }}>
          {ticket ? 'Edit Ticket' : 'New Ticket'}
        </h2>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 14 }}>
            <span style={{ display: 'block', marginBottom: 5, fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
              Title
            </span>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ display: 'block', marginBottom: 5, fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
              Description
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
            />
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                style={{
                  padding: '7px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                  border: '1px solid #fca5a5', background: '#fff1f2', color: '#dc2626',
                  fontWeight: 500,
                }}
              >
                Delete
              </button>
            ) : <span />}

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '7px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                  border: '1px solid var(--border)', background: 'transparent',
                  color: 'var(--text)', fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                style={{
                  padding: '7px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                  border: 'none', background: 'var(--accent)', color: '#fff',
                  fontWeight: 500, opacity: title.trim() ? 1 : 0.5,
                }}
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
