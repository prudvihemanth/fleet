import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  getTicketsUrl = `http://localhost:3000/api/tickets/getAllTickets`;
  updateTicketUrl = `http://localhost:3000/api/tickets/updateTicket`;

  getAllTickets() {
    return this.http.get(this.getTicketsUrl);
  }

  updateTicket(ticket) {
    return this.http.put(this.updateTicketUrl, ticket);
  }
}
