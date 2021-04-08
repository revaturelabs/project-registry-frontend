import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'p3-frontend';

  batchIdNum:any = 0;
  batchBatchIdStr:String = ""

  /*batchIdNumber(batchIdNumValue){
    this.batchIdNum = Number(batchIdNumValue);
  }

  batchBatchIdString(batchBatchIdString){
    this.batchBatchIdStr = String(batchBatchIdString);
  }*/
}
