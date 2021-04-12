import { Status } from "./status.model";
import { Tag } from "./tag.model";
import { User } from "./user.model";

export class Project{
    id: number;
    name: string;
    status:Status;
    description: string;
    owner: User;
    tags: Tag[];
    // Group 5, added batch + batchid of the iterator component
    batchId: number;
    batchBatchId: string;
    // end Group 5, added batch + batchid of the iterator component

    constructor(id:number, name:string, status:Status, description:string, owner:User, tags:Tag[], batchId:number, batchBatchId:string){
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.owner = owner;
        this.tags = tags;
        // Group 5, added batch + batchid of the iterator component
        this.batchId = batchId;
        this.batchBatchId = batchBatchId;
    // end Group 5, added batch + batchid of the iterator component
    }

}
