import axios from 'axios'
import type { Ticket, CreateTicketRequest } from '../types'

const client = axios.create({ baseURL: 'http://localhost:8000/api' })

export const getTickets = (): Promise<Ticket[]> =>
  client.get<Ticket[]>('/tickets').then((r) => r.data)

export const createTicket = (body: CreateTicketRequest): Promise<Ticket> =>
  client.post<Ticket>('/tickets', body).then((r) => r.data)
