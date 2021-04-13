import { Tag } from '../models/tag.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { REGISTRY_URL } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  getAllTags():Observable<Tag[]> {
    return this.http.get<Tag[]>(`${REGISTRY_URL}Tag`)
  }
}