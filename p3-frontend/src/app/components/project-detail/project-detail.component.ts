import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/project.model';
import { ViewProjectService } from './../../service/view-project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import { Status } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';




@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  constructor(private viewProjectService:ViewProjectService,
              private projectService:ProjectService,
              private router:ActivatedRoute,
              private route: Router,
              private location: Location) { }

  //In future link to status table?
  public statusMap:Record<string, number>={
    IN_ITERATION:1,
    CODE_FREEZE:2,
    CODE_REVIEW:3,
    NEEDS_CLEANUP:4,
    READY_FOR_ITERATION:5,
    ACTIVE:6,
    NEEDS_ATTENTION:7,
    ARCHIVED:8,
  };

  public statuses = ['ACTIVE', 'NEEDS_ATTENTION', 'ARCHIVED', 'CODE_REVIEW'];

  public projects?:Project[]=[]
  public project?:Project;

  public selectedId: any = '';
  

  ngOnInit(): void {

    this.selectedId = this.router.snapshot.params['id'];
    

    //get all projects
    this.viewProjectService.GetAllProjects().subscribe((data)=> {
      this.projects=data;

      this.project = this.projects.filter(x => {
        return x.id == this.selectedId;
      })[0];
      
      console.log(`Projects: ${this.projects}`);
      console.log(`Selected Project: ${JSON.stringify(this.project)}`);
    });
    
  } 
  
  //Update Project in the backend
  public submit():void{

    //Check that button is connected
    console.log("submit");
    //console.log(`status updated to: ${this.project?.status.name}`);


    if (this.project){

      //Setting the status id
      this.project.status.id=this.statusMap[this.project.status.name];  
      console.log(`status sending: ${this.project.status.name}`);

      this.projectService.updateProject(this.project).subscribe((data)=>{
        this.project=data;
        console.log(data)
      });
    }
    this.route.navigate(['']);
    //window.location.href = "http://localhost:4200/";
  }

  goBack():void {
    this.location.back();
  }

}
