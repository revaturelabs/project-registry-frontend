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

<<<<<<< HEAD
  statuses = ['ACTIVE', 'NEEDS_ATTENTION', 'ARCHIVED'];


  //Temporary model
  model = new Project(1, "name", new Status(1, "name", "desc"), "sample desc", new User(1, "username", new Role(1, "string")), [], 0, "");

  submitted = false;

  onSubmit() { this.submitted = true; }

  //needed?
  // submitted = false;
  // onSubmit() { this.submitted = true; }



  // Group5 Iterator: Passing batch to view-project
  batchIdNum:number = 0;
  batchBatchIdStr:string = "";

  // set emit event value to batchIdNum and batchBatchIdStr
  // CHECK CONSOLE FOR ID AND BATCHID
  changeBatchIdNumber(value:number){
    this.batchIdNum = value;
    console.log(this.batchIdNum)
  }
  changeBatchIdString(value:string){
    this.batchBatchIdStr = value;
    console.log(this.batchBatchIdStr)
  }
  // -- end Group5 Iterator: Passing batch to view-projec


                            //change to this once project is connected
  public desiredId:number=1 //this.router.snapshot.params['id'];
=======
  public statuses = ['ACTIVE', 'NEEDS_ATTENTION', 'ARCHIVED', 'CODE_REVIEW'];

>>>>>>> 7bf99c1ec47ad48cf25ce9494d09355ce8bd0bac
  public projects?:Project[]=[]

  // Group 5: delete ? because Angular prevent us from edit possibly undefined field
  // Set it to this.model as temporary value
  public project:Project = this.model;

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

    //console.log("submit");

    
    //  Group5 Iterator: Add batchId and batchBatchId to project field. What parameter project field need to do the update request?
    this.project.batchId = this.batchIdNum;
    this.project.batchBatchId = this.batchBatchIdStr;
    //  End Group5 Iterator: Add batchId and batchBatchId to project field

    // group 5: Only send data if the project had a name, and batchId > 0
    if (this.project.batchId>0 && this.project.name.trim().length>0){
    // end Group 5
      
    
      //Setting the status id
      this.project.status.id=this.statusMap[this.project.status.name];  
      console.log(`status sending: ${this.project.status.name}`);

      //check TS updates
      //this.project.name="rideForceTest";

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
