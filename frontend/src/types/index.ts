export type TicketStatus = 'todo' | 'in_progress' | 'done'

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
}

export interface CreateTicketRequest {
  title: string
  description: string
}

export interface UpdateTicketRequest {
  title?: string
  description?: string
  status?: TicketStatus
}
