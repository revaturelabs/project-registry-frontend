export class batchTemplate {
  id: number;
  batchId: string;
  startDate: string;
  skill: string;
  location: string;
​
  constructor(id:number, batchId: string, skill:string,location:string, startDate:string){
      this.id = id;
      this.batchId = batchId;
      this.startDate = startDate;
      this.skill = skill;
      this.location = location;
  }
}