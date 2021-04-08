import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'p3-frontend';

  batchIdNum:number = 0;
  batchBatchIdStr:string = "";

  changeBatchIdNumber(value:number){
    this.batchIdNum = value;
  }

  changeBatchIdString(value:string){
    this.batchBatchIdStr = value;
  }
}
