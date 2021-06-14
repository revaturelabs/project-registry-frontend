import { Component, OnInit } from '@angular/core';
import { Iteration } from 'src/app/models/iteration.model';
import { IterationService } from 'src/app/service/iteration.service';
import { map } from 'rxjs/operators';

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
  
  currentDate = new Date();
  timelineLowerBound: Date = this.currentDate;
  timelineUpperBound: Date = this.currentDate;

  batchArray?: Array<Iteration>;

  constructor(public iter: IterationService) { 
    let btn = document.getElementById("showDetails");
    btn?.addEventListener("click", (e:Event) => this.showBatchDetails());
  }


  ngOnInit(): void {
    this.initializeBatchArray(); // retrieve batch data
    this.timelineLowerBound.setDate(this.currentDate.getDate() - 14); // set lower bound of timeline view
    console.log(this.timelineLowerBound);
  }

  // .pipe(map(batch => batch.sort((a, b) => new Date(a.endDate).getTime() - new batch(b.endDate).getTime())))
  // This is what sorting our dates we get from the mock data service
  initializeBatchArray() {
    this.iter.getIterationMock().pipe(
      map(batch => batch.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()))
    )
      .subscribe(batch => {
        this.batchArray = batch as Array<Iteration>;

        console.log(this.batchArray);
      });
    console.log(this.batchArray);
    return;
  }

  calculateUpperBound(batchArray: Array<Iteration>) {
    this.timelineUpperBound = new Date(batchArray[batchArray.length - 1].endDate);
    this.timelineUpperBound.setDate(this.timelineUpperBound.getDate() + 7);
    console.log(this.timelineUpperBound);
  }

  showBatchDetails() : void{
    console.log('showing details!');
  };

  calculateP3StartDate(batch: Iteration): Date {
    let endDate = new Date(batch.endDate);
    endDate.setDate(endDate.getDate() - 21); // set date to 21 days prior to end date
    return endDate; // return new date as p3 start date
  }
}
