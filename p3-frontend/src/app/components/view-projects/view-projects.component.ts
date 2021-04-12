import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ViewProjectService } from 'src/app/service/view-project.service';
import { Project } from '../../models/project.model';
import { Tag } from 'src/app/models/tag.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';





export interface statusFilter {


}

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
  public filteredStatuses: Project[] = [];
  public dataSource: MatTableDataSource<Project> | any;

  public tagSelected: null;
  public statusSelected: null;

  //based on project.model.ts
  displayedColumns: string[] = [
    'id',
    'name',
    'status',
    'description',
    'owner',
    'tags',
  ];

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

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
  // -- end Group5 Iterator: Passing batch to view-project

  constructor(private viewProjectService: ViewProjectService) {
  }

  ngOnInit(): void {
    this.getProjects();
    this.getProjectTags();
    this.getProjectStatus();
    this.dataSource = new MatTableDataSource(this.projects);
  }

  ngAfterViewInit() {
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
  getProjects(): void {
    this.viewProjectService
      .GetAllProjects()
      .subscribe((report) => {
        this.dataSource.data = report as Project[],
        console.log(this.projects);
      });
  }

  getProjectTags(): void {
    this.viewProjectService.GetAllProjectTags().subscribe(data => this.tag = data)
    console.log(this.tag)
  }


  getProjectStatus(): void {
    this.viewProjectService.GetAllProjectStatus().subscribe(data => {
      this.projects = data;
      this.projects.forEach((project) => {
        console.log(project.status.name);
        
        if(!this.status.includes(project.status.name)){
          this.status.push(project.status.name);
        }
      })
      console.log(this.status);
      
    })
  }

  filterStatus(event: MatSelectChange): void {

    // //grabbed changed status value
//    this.statusSelected = event.value;
    console.log(this.statusSelected);

    if(this.statusSelected === 'noStatus'){
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

//    this.tagSelected = event.value;
    console.log(this.tagSelected);

    if(this.tagSelected === 'noTag'){
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


  filterResults(): void {
    if (this.tagSelected != null && this.statusSelected != null && this.tagSelected != 'noTag' && this.statusSelected != 'noStatus') {
      this.dataSource = new MatTableDataSource(this.filteredTags.filter(x =>
        this.filteredStatuses.includes(x)));

    } else if (this.tagSelected != null && this.tagSelected != 'noTag') {
      this.dataSource = new MatTableDataSource(this.filteredTags);
      console.log(this.dataSource);

    } else if (this.statusSelected != null && this.statusSelected != 'noStatus') {
      this.dataSource = new MatTableDataSource(this.filteredStatuses);
      console.log(this.dataSource);
    } else {
      this.dataSource = new MatTableDataSource(this.projects);
      console.log(this.dataSource);
    }


  }

  reset() {
    console.log("Page resets");
    this.dataSource = new MatTableDataSource(this.projects);
    this.filteredProjects = [];
    this.filteredTags = [];
    this.filteredStatuses = [];

    this.statusSelected = null;
    this.tagSelected = null;
  }

}
