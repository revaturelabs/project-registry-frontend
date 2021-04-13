import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { batchTemplate } from 'src/app/models/batch.model';
import { Iteration } from '../models/iteration.model';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  //url for the API containing batches
  apiUrl = "https://caliber2-mock.revaturelabs.com/mock/training/batch";

  constructor(private http: HttpClient) { }

  getBatchService(): Observable<batchTemplate[]>{
    return this.http.get<batchTemplate[]>(this.apiUrl)
  }

  sendIteration(iteration: Iteration): Observable<Iteration> {
    console.log("Here is the iteration we're about to send: " + JSON.stringify(iteration));
    return this.http.post<Iteration>(`http://localhost:8080/api/iteration/sendIteration`, iteration);
    //.pipe(catchError(this.handleError<ClientMessage>('New Order', undefined)));
   }

}
