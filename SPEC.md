# Spec: Barebones Task Manager

Kanban board with drag-and-drop + list view. No auth, no DB.

---

## Data model

```
Ticket { id: uuid, title: str, description: str, status: "todo" | "in_progress" | "done" }
```

---

## Backend (FastAPI, in-memory)

| Method | Path | Body / Notes |
|--------|------|--------------|
| GET | `/api/tickets` | returns all tickets |
| POST | `/api/tickets` | `{ title, description }` → status defaults to `"todo"` |
| PUT | `/api/tickets/{id}` | `{ title?, description?, status? }` |
| DELETE | `/api/tickets/{id}` | — |

Store: module-level `dict[str, Ticket]`.

---

## Frontend (React + TypeScript)

**Packages to add:** `@hello-pangea/dnd`

### Component tree

```
App (view toggle: board | list)
├── BoardView
│   ├── Column × 3  (Todo / In Progress / Done)
│   │   ├── TicketCard × n   — draggable; click → opens modal
│   │   └── "+ Add" button   — opens modal (create mode)
│   └── TicketModal          — create / edit form + Delete button
└── ListView
    ├── TicketRow × n        — click → opens modal
    └── TicketModal          — shared create / edit form + Delete button
```

### Files

| File | Responsibility |
|------|----------------|
| `src/api/tickets.ts` | axios CRUD calls |
| `src/types/index.ts` | `Ticket` type |
| `src/pages/App.tsx` | fetch tickets, view toggle, shared modal state |
| `src/components/BoardView.tsx` | DnD context + 3 columns |
| `src/components/Column.tsx` | droppable column |
| `src/components/TicketCard.tsx` | draggable card |
| `src/components/ListView.tsx` | table of all tickets, sortable by status |
| `src/components/TicketModal.tsx` | create/edit/delete modal |

### Behaviour

- View toggle (Board / List) in header — persists selected view.
- Board: drag-drop calls `PUT /api/tickets/{id}` with new status, optimistic update.
- List: shows all tickets in a table with status badge; click row → edit modal.
- Modal shared across both views — create, edit, delete.
- Modal opens empty for create, pre-filled for edit.
- Delete button in modal calls `DELETE` then closes.

---

## Implementation phases

### Phase 1 — Create & Read
End state: create tickets via modal, see them in Todo column.

- **Backend:** in-memory store, `GET /api/tickets`, `POST /api/tickets`
- **Frontend:** `Ticket` type, axios `getTickets`/`createTicket`, `Board` with 3 static columns, `TicketCard` (display only), `TicketModal` (create form + Save/Cancel)
- **Wire-up:** `+ Add` on Todo column → modal → POST → ticket appears

### Phase 2 — Edit & Delete
End state: click any card to edit or delete it.

- **Backend:** `PUT /api/tickets/{id}`, `DELETE /api/tickets/{id}`
- **Frontend:** axios `updateTicket`/`deleteTicket`, `TicketCard` click → modal in edit mode, Delete button in modal
- **Wire-up:** save → PUT → card updates; delete → DELETE → card removed

### Phase 3 — Drag-and-drop
End state: drag cards between columns to change status.

- **Frontend only:** install `@hello-pangea/dnd`, wrap `Board` in `DragDropContext`, `Column` → `Droppable`, `TicketCard` → `Draggable`
- **Wire-up:** `onDragEnd` → `PUT /api/tickets/{id}` with new status → optimistic state update

### Phase 4 — List view
End state: toggle between Kanban board and a flat list of all tickets.

- **Frontend only:** `ListView` component (table with title, status badge, description), view toggle in header, lift shared state/handlers to `App.tsx`, extract `BoardView.tsx`
- **Wire-up:** same CRUD handlers reused; list row click → edit modal

---

## Out of scope

Priority, assignees, labels, auth, persistence, multiple boards.
