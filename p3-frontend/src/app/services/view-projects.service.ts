import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { BACKEND_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewProjectsService {
  public data:any = []
  constructor(private http: HttpClient, private vpServ: ViewProjectsService) { }

  getAllProjects(): Observable<Project>{

    //TODO: get all projects from backend using backend url
    // return this.http.get(`${BACKEND_URL}/api/project`)
  }

  getProjectByFilter(): Observable<Project>{
    //TODO: Get projects based off drop down menu item value
  

  }

  
}
