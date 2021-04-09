import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iteration } from '../models/iteration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type ' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  placeholder: any;

  sendIteration(iteration: Iteration): Observable<Iteration> {
    console.log("Here is the iteration we're about to send: " + JSON.stringify(iteration));
    return this.http.post<Iteration>(`http://localhost:8080/api/iteration/sendIteration`, iteration);
    //.pipe(catchError(this.handleError<ClientMessage>('New Order', undefined)));
   }


}
