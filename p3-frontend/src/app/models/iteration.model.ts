import { Project } from "./project.model";

export class Iteration{
    batchId: String;
    batchProject: Project;


constructor(batchId:String, batchProject:Project) {
    this.batchId = batchId;
    this.batchProject = batchProject;

}
}