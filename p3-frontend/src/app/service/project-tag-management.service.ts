import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectTagManagementService {

  private a = new BehaviorSubject<Tag[]>([]);
  currentA = this.a.asObservable();

  constructor() { }



  updateTagArray(arr: Tag[]){
    this.a.next(arr);
  }
}
