import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { Role } from '../../models/role.model';
import { Status } from '../../models/status.model';
import { Tag } from '../../models/tag.model';
import { User } from '../../models/user.model';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  public newProject: Project = new Project(0, "", new Status(1,"IN_ITERATION",""),"", new User(1, "william", new Role(1,"admin")), [new Tag(1, "Revature", "Made by Revature")]);
  public projectName: string = "Name";
  public projectDescription: string = "Description";

  public errorDetected:boolean = false;
  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {

  }
  public registerProject() {
    this.newProject.name = this.projectName;
    this.newProject.description = this.projectDescription;
    console.log(this.newProject);
    this.projectService.registerProject(this.newProject)
      .subscribe(project =>
        {
          if(project.name == this.projectName){
            this.projectName= "Name";
            this.projectDescription = "Description";
            this.errorDetected=false;
          }
          else {
            this.errorDetected = true;
            var errorElement = document.getElementById("errorText");
            if(errorElement){
              errorElement.innerHTML="An error Occured";
            }
          }
        });
  }

}
