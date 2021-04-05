import { Status } from "./status.model";
import { Tags } from "./tags.model";
import { User } from "./user.model";

export class Project{
    id: number;
    name: string;
    status:Status;
    description: string;
    owner: User;
    tags: Tags;

    constructor(id:number, name:string, status:Status, description:string, owner:User, tags:Tags){
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description
        this.owner = owner;
        this.tags = tags;
    }
}