export class Status{
    id: number;
    name: string;
    // description: string;

    //removed status description
    constructor(id:number, name:string){
        this.id = id;
        this.name = name;
        // this.description = description;
    }
}