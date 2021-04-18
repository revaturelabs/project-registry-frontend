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

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT"
    })
  }

  //url for the API containing batches
  apiUrl = "https://caliber2-mock.revaturelabs.com/mock/training/batch";

  //Added by Quinn to find iteration count:
  public iterationArr: Iteration[] = [];
  public iterationMap: Map<number, number> = new Map<number, number>();

  constructor(private http: HttpClient) { }

  getBatchService(): Observable<batchTemplate[]> {
    return this.http.get<batchTemplate[]>("http://localhost:8080/api/iteration")
  }

  getIteration(): Observable<Iteration[]> {
    return this.http.get<Iteration[]>("http://localhost:8080/api/iteration")
  }

  getBatchServiceMock(): Observable<batchTemplate[]> {
    return this.http.get<batchTemplate[]>(this.apiUrl)
  }

  getIterationMock(): Observable<Iteration[]> {
    return this.http.get<Iteration[]>(this.apiUrl)
  }

  sendIteration(iteration: Iteration): Observable<Iteration> {
    console.log("Here is the iteration we're about to send: " + JSON.stringify(iteration));
    return this.http.post<Iteration>(`http://localhost:8080/api/iteration`, iteration, this.httpOptions);
    //.pipe(catchError(this.handleError<ClientMessage>('New Order', undefined)));
  }

  //In order to get iteration count:
  getAllIterations(): Observable<Iteration[]> {
    return this.http.get<Iteration[]>(`${REGISTRY_URL}iteration`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Iteration[]>('getAllIterations', []))
      )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log it to the console if something goes wrong
      return of(result as T);
    }
  }

  public findProjectIterationCount() {
    this.getAllIterations().subscribe((data) => {

      this.iterationArr = data;
      console.log(JSON.stringify(this.iterationArr));


      this.iterationArr.forEach(element => {

        if (!this.iterationMap.has(element?.project?.id as number)) {
                                   
          // If the key (project id) is not in iterationMap, value = 1
          this.iterationMap.set(element?.project?.id as number, 1);
        } else {
                                   
          // If this key (project id) already in iterationMap, get value from it, then + 1 from the count
          this.iterationMap.set(element?.project?.id as number, this.iterationMap.get(element?.project?.id as number) as number + 1);
        }

      })

      console.log(this.iterationMap);
    })
    
  }

}
