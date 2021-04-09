import { Project } from 'src/app/models/project.model';
import { ViewProjectService } from './../../service/view-project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  constructor(private viewProjectService:ViewProjectService, private router:ActivatedRoute) { }

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

}
