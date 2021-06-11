import { Component, OnInit } from '@angular/core';
import { batchTemplate } from '../../models/batch.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  /*
      component not implemented anywhere, place <app-timeline></app-timeline> at end of view-projects.component.html

      **** REMEMBER TO DELETE WHEN DONE TESTING BEFORE YOU PUSH TO "blue-team" BRANCH ****
  */

  // timelineLowerBound: Date = new Date(new Date().setDate(new Date().getDate() - 14)); // current day - 14 days
  readonly timelineLowerBound: Date = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000); // current day - 14 days in milliseconds, static
  timelineUpperBound?: Date;
  batchArray?: Array<batchTemplate>;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.timelineLowerBound);
    console.log(this.timelineUpperBound);
    // initializeBatchArray()
  }

  // initializeBatchArray(): Array<batchTemplate>;

  // calculateUpperBound(): Date;

  // showBatchDetails();

  // calculateP3StartDate(): Date;
}
