import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ViewProjectService } from 'src/app/service/view-project.service';
import { Project } from '../../models/project.model';
import { Tag } from 'src/app/models/tag.model';
import { batchTemplate } from 'src/app/models/batch.model';
import { Iteration } from 'src/app/models/iteration.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { IterationService } from 'src/app/service/iteration.service';
import { Subscription } from 'rxjs';
import { Phase } from 'src/app/models/phase';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export interface statusFilter {}

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css'],
})
export class ViewProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public filteredProjects: Project[] = [];
  public tag: Tag[] = [];
  public status: string[] = [];
  public filteredTags: Project[] = [];
  public filteredPhase: Project[] = [];
  public filteredStatuses: Project[] = [];
  public phase: Phase[] = [];
  public dataSource: MatTableDataSource<Project> | any;

  public tagSelected: null;
  public phaseSelected: null;
  public statusSelected: null;

  //based on project.model.ts
  displayedColumns: string[] = [
    'id',
    'name',
    'status',
    'phase',
    'description',
    'owner',
    'tags',
    'iteration'
  ];

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  // ----------------------------------------------------------------------------------------------------------------------------------
  // --------------------  Group5 Iterator: Passing batch to detail-project -----------------------------------------------------------
  sendBatch ?: batchTemplate;
  allIterations: Iteration[] =[];
  sub : Subscription = new Subscription();
  iteration? : Iteration;
  allBatches? : batchTemplate[];
  selectedBatch?: string;
  filteredByIteration?: Project[];
  // message
  iterationSuccess?: string;
  iterationError?: string;

  changeBatch(value:batchTemplate){
    this.sendBatch = value;
  }

  getBatches(){
    this.iterationService.getBatchServiceMock().subscribe(data => this.allBatches= data)
  }

  getIteration(){
    console.log("all iteration")
    this.iterationService.getIteration().subscribe(iteration =>{ 
      this.allIterations = iteration
      console.log(this.allIterations)
    }) 
    
  }
  
  sendIteration(row: Project){
    if (this.sendBatch){
      this.iteration = new Iteration(this.sendBatch.batchId, row, this.sendBatch.id, this.sendBatch.startDate, this.sendBatch.endDate);
      if(this.allIterations.length>0){
        for (let i =0; i<this.allIterations.length; i ++){
          let projects: Project = this.allIterations[i].project as Project
          console.log(row.id, projects.id)
          if(row.id != projects.id){
            this.iterationService.sendIteration(this.iteration).subscribe(data => this.iterationSuccess = `Successfully iterate project ${data.project?.name.toUpperCase()} of ${data.project?.owner.username.toUpperCase()} to batch ${data.startDate} ${data.batchId}`);
            this.getIteration()
            this.selectedBatch = this.sendBatch.batchId
            console.log("-----")
          } else if((row.id == projects.id)) {
            console.log("same id")
            this.iterationError = `Project ${row.name.toUpperCase()} had already assign to batch ${this.sendBatch.batchId}`;
          } else this.iterationError = "Cannot save this iteration to database"
        }
      } else {
        this.iterationService.sendIteration(this.iteration).subscribe(data => this.iterationSuccess = `Successfully iterate project ${data.project?.name.toUpperCase()} of ${data.project?.owner.username.toUpperCase()} to batch ${data.startDate} ${data.batchId}`);
        this.getIteration()
      }
      
    }
  }

    filterIteration(event: MatSelectChange): void {
      console.log(event.value)
   
        if(this.allIterations && this.allIterations.length>0){
          let filtered : Project[] = [] ;

        for (let i=0; i<this.allIterations.length; i ++) {
          if (this.allIterations[i].batchId == event.value ){
            filtered.push(this.allIterations[i].project as Project)
            console.log("itera",this.allIterations[i].project as Project)
          }
        }
        console.log("iteration project",filtered)
        this.dataSource = new MatTableDataSource(filtered);
      } else {console.log("error: no iterators receive from the database")}
      
    }

  // --------------------  End Group5 Iterator: Passing batch to detail-project --------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------

 
  constructor(private viewProjectService: ViewProjectService, private projectService: ProjectService, private iterationService: IterationService, private route: Router, private location:Location) {
    var numberOfTimesAround = 0;
    route.events.subscribe(val => {
      if (location.path() == "/project-detail" && numberOfTimesAround < 1) {
        console.log("running")
        this.getProjects();
        numberOfTimesAround++;
      }
    })

  }

  ngOnInit(): void {
    console.log("onInIt");
    this.getProjects();
    this.getProjectTags();
    this.getProjectPhase();
    this.getProjectStatus();
    this.getIteration(); // group 5 getIteration, save them to allBatches (a seperate Iteration class without project object)
    this.getBatches(); 
    this.dataSource = new MatTableDataSource(this.projects);
  }

  static getProjectsStatic(){
    
  }

  
  ngAfterViewInit() {
    // this.getProjects();
    // this.getProjectTags();
    // this.getProjectPhase();
    // this.getProjectStatus();
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filter the columns
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //todo add all filters, chain with if

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

  //returns all the projects in DB
  public getProjects(): void {
    console.log("Getting Projects");
    this.viewProjectService.GetAllProjects().subscribe((report) => {
      (this.dataSource.data = report as Project[]), console.log(this.projects);
    });
  }
  // return all tags from db
  getProjectTags(): void {
    this.viewProjectService
      .GetAllProjectTags()
      .subscribe((data) => (this.tag = data));
    console.log(this.tag);
  }

  // return all phase from db
  getProjectPhase(): void {
    this.viewProjectService
      .GetAllProjectPhase()
      .subscribe((data) => {(this.phase = data);
    console.log(this.phase);})
  }

  // grabs all the status
  getProjectStatus(): void {
    this.viewProjectService.GetAllProjectStatus().subscribe((data) => {
      this.projects = data;
      this.projects.forEach((project) => {
        console.log(project.status.name);

        if (!this.status.includes(project.status.name)) {
          this.status.push(project.status.name);
        }
      });
      console.log(this.status);
    });
  }

  filterStatus(event: MatSelectChange): void {
    // //grabbed changed status value
    //this.statusSelected = event.value;
    console.log(this.statusSelected);

    if (this.statusSelected === 'noStatus') {
      this.filteredProjects = this.projects;
    } else {
      //grabbed projects array
      console.log(this.projects);
      this.filteredStatuses = [];
      for (const i of this.projects) {
        //finds projects with status name the same as selected status
        console.log(i);

        if (i.status.name === this.statusSelected) {
          this.filteredStatuses.push(i);
        }
      }
    }
    this.filterResults();
  }

  filterTag(event: MatSelectChange): void {
    //this.tagSelected = event.value;
    console.log(this.tagSelected);

    if (this.tagSelected === 'noTag') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredTags = [];
      for (const i of this.projects) {
        for (const j of i.tags) {
          if (j.name === this.tagSelected) {
            this.filteredTags.push(i);
          }
        }
      }
    }
    console.log(this.filteredTags);
    this.filterResults();
  }

  filterPhase(event: MatSelectChange): void {
    console.log(this.phaseSelected);

    if (this.phaseSelected === 'noPhase') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredPhase = [];
      for (const i of this.projects) {
        for (const j of i.tags) {
          if (j.name === this.phaseSelected) {
            this.filteredPhase.push(i);
          }
        }
      }
    }
    console.log(this.filteredPhase);
    this.filterResults();
  }

  filterResults(): void {
    if (
      this.tagSelected != null &&
      this.statusSelected != null &&
      this.phaseSelected != null &&
      this.tagSelected != 'noTag' &&
      this.statusSelected != 'noStatus' &&
      this.phaseSelected != 'noPhase'
    ) {
      this.dataSource = new MatTableDataSource(
        this.filteredTags.filter((x) => this.filteredStatuses.includes(x))
      );
    } else if (this.tagSelected != null && this.tagSelected != 'noTag') {
      this.dataSource = new MatTableDataSource(this.filteredTags);
      console.log(this.dataSource);
    } else if (this.phaseSelected != null && this.phaseSelected != 'noPhase') {
      this.dataSource = new MatTableDataSource(this.filteredPhase);
      console.log(this.dataSource);
    } else if (
      this.statusSelected != null &&
      this.statusSelected != 'noStatus'
    ) {
      this.dataSource = new MatTableDataSource(this.filteredStatuses);
      console.log(this.dataSource);
    } else {
      this.dataSource = new MatTableDataSource(this.projects);
      console.log(this.dataSource);
    }
  }

  reset() {
    console.log('Page resets');
    this.dataSource = new MatTableDataSource(this.projects);
    this.filteredProjects = [];
    this.filteredTags = [];
    this.filteredPhase = [];
    this.filteredStatuses = [];

    this.statusSelected = null;
    this.tagSelected = null;
    this.phaseSelected = null;
    this.selectedBatch = "";
  }


  rowClicked(projectId:number){
    if(projectId)
      var currentProject:Project|undefined = this.projects.find(p => p.id== projectId);
      
      console.log(currentProject);
      if(currentProject!= undefined)
        this.projectService.setCurrentProject (currentProject);
        this.route.navigateByUrl('project-detail')
  }
}
