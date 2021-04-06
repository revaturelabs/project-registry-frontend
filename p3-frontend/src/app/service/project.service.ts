import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { REGISTRY_URL } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http:HttpClient) { }


  public registerProject(newProject:Project):Observable<Project> {
    return this.http.post<Project>(`${REGISTRY_URL}project`,newProject, this.httpOptions)
      .pipe(
        tap(_ => console.log('posting project..')),
        catchError(this.handleError<any>('createProject'))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to a remote logging infrastructure
      // this.logger.error("WE ENCOUNTERED AN ERROR IN " + operation);
      console.error(error) // we'll just log it to the console

      // TODO: better job transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // we want to ensure that the app keeps running by returning an empty result
      return of(result as T);
    }
  }
}
