import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { REGISTRY_URL } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewProjectService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http:HttpClient) { }

  /* Return all the projects from DB**/
  public GetAllProjects():Observable<Project[]>{
    return this.http.get<Project[]>(`${REGISTRY_URL}project`, this.httpOptions)
    .pipe(
      catchError(this.handleError<Project[]>('GetProject',[]))
    )}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log it to the console if something goes wrong
      return of(result as T);
    }
  }
}

