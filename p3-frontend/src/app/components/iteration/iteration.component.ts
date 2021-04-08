import { batchTemplate } from './../../models/batch.model';
import { Component, OnInit } from '@angular/core';
​
@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css']
})
export class IterationComponent implements OnInit {
​
  constructor() { }
​
  ngOnInit(): void {
    this.httpGet(this.apiUrl);
  }
​
  //url for the API containing batches
  apiUrl = "https://caliber2-mock.revaturelabs.com/mock/training/batch";
  //empty string to put the API's text response into
  batches: string = "";
  //array of batchTemplates to put the 2 batch IDs into
  theBatches: batchTemplate[] = [];
​
​
  //make a call to the API to retrieve all batches
  httpGet(apiUrl: string) {
    var Http = new XMLHttpRequest();
    Http.open("GET", apiUrl);
    Http.send();
​
    Http.onreadystatechange = (e) => {
      //Get the batches as a response (string)
      this.batches = Http.responseText;
      //Parse the batches, and only use id and batchId to fill in batchTemplate values (we don't need the 8 million other values in a given batch)
      this.theBatches = JSON.parse(this.batches);
      //console.log("Here are all of the batches: " + this.batches);
      //console.log("Here's the first batch's integer id: " + this.theBatches[0].id);
      //console.log("Here is the first batch's string id: " + this.theBatches[0].batchId);
    }
  }
}