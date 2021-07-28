import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectTagManagementService {
//this service class is to update a array that is used to inject into project object to update/create a new project
//behaviorSubject initial value is an empty array
//on each specific componenet, set this initial array to the exisiting array tag if an exisiting project otherwise if new, this array is just empty
  private tagArray = new BehaviorSubject<Tag[]>([]);
  currentTagArray = this.tagArray.asObservable();

  constructor() { }
  //simply overwrites previous tag to new one
  updateTagArray(arr: Tag[]){
    this.tagArray.next(arr);
  }
}
