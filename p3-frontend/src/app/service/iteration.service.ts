import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { batchTemplate } from 'src/app/models/batch.model';
import { REGISTRY_URL } from 'src/environments/environment';
import { Iteration } from '../models/iteration.model';


@Injectable({
  providedIn: 'root'
})
export class IterationService {

  //url for the API containing batches
  apiUrl = "https://caliber2-mock.revaturelabs.com/mock/training/batch";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getBatchService(): Observable<batchTemplate[]>{
    return this.http.get<batchTemplate[]>(this.apiUrl)
  }

  public getAllIterations():Observable<Iteration[]>{
    return this.http.get<Iteration[]>(`${REGISTRY_URL}iteration`, this.httpOptions)
    .pipe(
      catchError(this.handleError<Iteration[]>('getAllIterations',[]))
    )}
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log it to the console if something goes wrong
        return of(result as T);
      }
    } 

  sendIteration(iteration: Iteration): Observable<Iteration> {
    console.log("Here is the iteration we're about to send: " + JSON.stringify(iteration));
    return this.http.post<Iteration>(`http://localhost:8080/api/iteration/sendIteration`, iteration);
    //.pipe(catchError(this.handleError<ClientMessage>('New Order', undefined)));
   }

}
