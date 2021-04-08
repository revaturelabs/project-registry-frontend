export class batchTemplate {
  id: number;
  batchId: String;
  startDate: String;
  skill: String;
  location: String;
​
  constructor(id:number, batchId: String, skill:String,location:String, startDate:String){
      this.id = id;
      this.batchId = batchId;
      this.startDate = startDate;
      this.skill = skill;
      this.location = location;
  }
}