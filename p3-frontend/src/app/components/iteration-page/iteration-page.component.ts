import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ViewProjectService } from 'src/app/service/view-project.service';

@Component({
  selector: 'app-iteration-page',
  templateUrl: './iteration-page.component.html',
  styleUrls: ['./iteration-page.component.css']
})
export class IterationPageComponent implements OnInit {

  constructor( private viewProjectService: ViewProjectService  ) { }

  ngOnInit(): void {
    this.getProjects()
  }

  allProjects: Project[] = [];

    //returns all the projects in DB
    getProjects(): void {
      this.viewProjectService
        .GetAllProjects()
        .subscribe((report) => {
          this.allProjects = report as Project[],
          console.log(this.allProjects);
        });
    }

}
