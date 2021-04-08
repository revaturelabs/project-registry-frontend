import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Role } from 'src/app/models/role.model';
import { Status } from 'src/app/models/status.model';
import { Tag } from 'src/app/models/tag.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/service/project.service';
import { TagService } from 'src/app/service/tag.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes:number[] = [ENTER, COMMA];
  selectedTags:Tag[] = [new Tag(1, "Angular", "This project used an Angular Frontend")];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public newProject: Project = new Project(0, "", new Status(1,"IN_ITERATION",""),"", new User(1, "william", new Role(1,"admin")), [new Tag(1, "Revature", "Made by Revature")]);
  public projectName: string = "Name";
  public projectDescription: string = "Description";
  public tags:Tag[] = [];

  public errorDetected:boolean = false;
  constructor(public projectService: ProjectService, public tagService: TagService) {  }

  ngOnInit(): void {
    this.getAllTags();
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

  printTag() {
    console.log(this.tags);
  }

  getAllTags(){
    this.tagService.getAllTags().subscribe(data => {
      this.tags = data;
    })

  };
}
