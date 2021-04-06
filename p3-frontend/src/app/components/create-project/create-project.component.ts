import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Role } from 'src/app/models/role.model';
import { Status } from 'src/app/models/status.model';
import { Tag } from 'src/app/models/tag.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  public newProject: Project = new Project(0, "", new Status(0,"",""),"", new User(0, "", new Role(0,"")), [new Tag(0, "Revature", "Made by Revature")]);
  public projectName: string = "Name";
  public projectDescription: string = "Description";


  constructor(public projectService: ProjectService) { }

  ngOnInit(): void {

  }
  public registerProject() {
    this.newProject.name = this.projectName;
    this.newProject.description = this.projectDescription;
    this.projectService.registerProject(this.newProject);
    console.log("Name " + this.projectName);
  }

}
