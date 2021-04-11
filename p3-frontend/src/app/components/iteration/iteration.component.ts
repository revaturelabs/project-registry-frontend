import { batchTemplate } from './../../models/batch.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IterationService } from 'src/app/service/iteration.service';
import { Subscription } from 'rxjs';
​
@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css']
})
export class IterationComponent implements OnInit, OnDestroy {

  batchIdString: String = "";
  batchNumber: number = 0;

  //array of batchTemplates to put the 2 batch IDs into
  theBatches: batchTemplate[] = [];

  sub:Subscription = new Subscription(); // just for clean up memory purpose

  // Send data to the parent component
  @Output() batchIdNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() batchBatchIdString: EventEmitter<string> = new EventEmitter<string>();

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

    this.batchIdNumber.emit(Number(separateBatchAndId[0]));
    this.batchBatchIdString.emit(String(separateBatchAndId[1]));

    //Adding direct assignments without event emitter
    //Used for sending info to iteration service (which is then sent to backend)
    this.batchNumber = Number(separateBatchAndId[0]);
    this.batchIdString = separateBatchAndId[1];

   // If select the place holder, id and batch id = 0 and empty string. Need some method to NOT send 0 and empty string to database + Warn the user
  } else {
    this.batchIdNumber.emit(0);
    this.batchBatchIdString.emit("");
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