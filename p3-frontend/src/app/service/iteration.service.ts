import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { batchTemplate } from 'src/app/models/batch.model';

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
}
