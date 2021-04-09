import { batchTemplate } from './../../models/batch.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Iteration } from 'src/app/models/iteration.model';
import { IterationService } from 'src/app/service/iteration.service';
​
@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css']
})
export class IterationComponent implements OnInit {
​
  constructor(private iterationService: IterationService) { }
​
  ngOnInit(): void {
    this.httpGet(this.apiUrl);
   // console.log(this.theBatches)
  }
​
tempIteration: Iteration = {
  batchId: "",
  batchProject: {
    id: 0,
    name: "",
    status: {
      id: 0,
      name: "",
      description: ""
    },
    description: "",
    owner: {
    id: 0,
    username: "",
    role: {
      id:0,
      type: "",
      },
    },
  tags: []
  }
}

iteration: Iteration = {
  batchId: "",
  batchProject: {
    id: 0,
    name: "",
    status: {
      id: 0,
      name: "",
      description: ""
    },
    description: "",
    owner: {
    id: 0,
    username: "",
    role: {
      id:0,
      type: "",
      },
    },
  tags: []
  }
}

batchIdString: String = "";
batchNumber: number = 0;

  //url for the API containing batches
  apiUrl = "https://caliber2-mock.revaturelabs.com/mock/training/batch";
  //empty string to put the API's text response into
  batches: string = "";
  //array of batchTemplates to put the 2 batch IDs into
  theBatches: batchTemplate[] = [];

  // Send data to the parent component
  @Output() batchIdNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() batchBatchIdString: EventEmitter<string> = new EventEmitter<string>();

  // Don't change this string value, it connected to the logic, the app will throw err. It's a placeholder/ first value for the selectBatch option
  seletedIdAndBatchId : String = "Please select a batch"
​
selectBatch(){
  // skip placeholder value
  if(this.seletedIdAndBatchId != "Please select a batch"){
    let separateBatchAndId = this.seletedIdAndBatchId.split("|");
    console.log(separateBatchAndId);

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
  httpGet(apiUrl: string) {
    var Http = new XMLHttpRequest();
    Http.open("GET", apiUrl);
    Http.send();
​
    Http.onreadystatechange = (e) => {
      //Get the batches as a response (string)
      this.batches = Http.responseText;
      console.log(this.batches)
      //Parse the batches, and only use id and batchId to fill in batchTemplate values (we don't need the 8 million other values in a given batch)
      this.theBatches = JSON.parse(this.batches);
      //console.log("Here are all of the batches: " + this.batches);
      //console.log("Here's the first batch's integer id: " + this.theBatches[0].id);
      //console.log("Here is the first batch's string id: " + this.theBatches[0].batchId);
    }
  }

  //Sending our two id's to iteration service to then be sent to backend
  sendIteration() {
    console.log("sendIteration() was hit");
    this.iteration.batchId = this.batchIdString;
    this.iterationService.sendIteration(this.iteration).subscribe((data: Iteration) => this.tempIteration = data);
}
}