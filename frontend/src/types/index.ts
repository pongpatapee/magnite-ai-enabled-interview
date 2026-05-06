export type TicketStatus = 'todo' | 'in_progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: Priority
}

export interface CreateTicketRequest {
  title: string
  description: string
  status: TicketStatus
  priority?: Priority
}

export interface UpdateTicketRequest {
  title?: string
  description?: string
  status?: TicketStatus
  priority?: Priority
}
