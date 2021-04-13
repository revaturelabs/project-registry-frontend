import { batchTemplate } from './../../models/batch.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IterationService } from 'src/app/service/iteration.service';
import { Subscription } from 'rxjs';
import { Iteration } from 'src/app/models/iteration.model';
​
@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css']
})
export class IterationComponent implements OnInit, OnDestroy {

  //array of batchTemplates to put the 2 batch IDs into
  theBatches: batchTemplate[] = [];

  sub:Subscription = new Subscription(); // just for clean up memory purpose

  // Send data to the parent component
  @Output() sendBatch: EventEmitter<batchTemplate> = new EventEmitter<batchTemplate>();


  // Don't change this string value, it connected to the logic, the app will throw err. It's a placeholder/ first value for the selectBatch option
  seletedIdAndBatchId : String = "Please select a batch"
​
constructor(private iterationService: IterationService) { }

ngOnInit(): void {
  this.httpGet();
}

// Clean up memory
ngOnDestroy(): void{
  this.sub.unsubscribe()
}

selectBatch(){
  // skip placeholder value
  if(this.seletedIdAndBatchId != "Please select a batch"){
    let separateBatchAndId = this.seletedIdAndBatchId.split("|");
    // id:number, batchId: string, skill:string,location:string, startDate:string, endDate:string
    this.sendBatch.emit(new batchTemplate(Number(separateBatchAndId[0]),separateBatchAndId[1],"","",separateBatchAndId[2],separateBatchAndId[3]));

  } 
}​

  //make a call to the API to retrieve all batches
  httpGet(){
      this.sub = this.iterationService.getBatchService().subscribe(batches => this.theBatches = batches)

    /*var Http = new XMLHttpRequest();
    Http.open("GET", apiUrl);
    Http.send();
​
    Http.onreadystatechange = (e) => {
      //Get the batches as a response (string)
      this.batches = Http.responseText;
      //Parse the batches, and only use id and batchId to fill in batchTemplate values (we don't need the 8 million other values in a given batch)
      this.theBatches = JSON.parse(this.batches);
    }*/


  }

}