import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/models/project.model';
import { ViewProjectService } from './../../service/view-project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
              private router:ActivatedRoute) { }

  //In future link to status table?
  public statusMap:Record<string, number>={
    IN_ITERATION:1,
    CODE_FREEZE:2,
    CODE_REVIEW:3,
    NEEDS_CLEANUP:4,
    READY_FOR_ITERATION:5,
    ACTIVE:6,
    NEEDS_ATTENTION:7,
    ARCHIVE:8,
  };

  public statuses=['ACTIVE', 'NEEDS_ATTENTION', 'ARCHIVE'];

  // //Temporary model
  //model = new Project(1, "name", new Status(1, "name", "desc"), "sample desc", new User(1, "username", new Role(1, "string")), []);

  //needed?
  // submitted = false;
  // onSubmit() { this.submitted = true; }





                            //change to this once project is connected
  public desiredId:number=1 //this.router.snapshot.params['id'];
  public projects?:Project[]=[]
  public project?:Project;



  ngOnInit(): void {

    //get all projects
    this.viewProjectService.GetAllProjects().subscribe((data)=>
      {this.projects=data;

        //select project based on id
        for (let i=0; i<this.projects.length; i++){
          if (this.projects[i].id==this.desiredId){
            this.project=this.projects[i];
          }
        }


      console.log(`Projects: ${this.projects}`);
      console.log(`Selected Project: ${this.project}`);
      })
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
  }
}
