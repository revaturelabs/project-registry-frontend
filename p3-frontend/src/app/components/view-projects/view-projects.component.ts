import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ViewProjectService } from 'src/app/service/view-project.service';
import { Project } from '../../models/project.model';
import { Tag } from 'src/app/models/tag.model';
import { MatSelectChange } from '@angular/material/select';



export interface statusFilter{
  

}

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css'],
})
export class ViewProjectsComponent implements OnInit {

  public projects: Project[] = [];
  public filteredProjects: Project[] = [];
  public tag:Tag[]=[];
  public filteredTags: Project[] = [];
  public dataSource: MatTableDataSource<Project> | any ;


  
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
  applyFilter(filterValue: any) {

    // const filterValue = (event.target as HTMLInputElement).value;
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
      .subscribe((report) => (this.dataSource.data = report as Project[]));
    console.log(this.projects);
  }

  getProjectTags():void{
    this.viewProjectService.GetAllProjectTags().subscribe(data=>this.tag=data)
    console.log(this.tag)
  }


  getProjectStatus():void{
    this.viewProjectService.GetAllProjectStatus().subscribe(data=> {
      this.projects=data, 
      console.log(this.projects)

    })
  }

  filterStatus(event: MatSelectChange): void{
  
    // //grabbed changed status value
    const status = event.value;
    console.log(status);
    
    //grabbed projects array
    // const projects = this.dataSource.filteredData
    console.log(this.projects);
    this.filteredProjects = [];
    //isolates each project
    for (const i of this.projects) {
      //finds projects with status name the same as selected status
      if (i.status.name === status) {
        console.log(i);
        this.filteredProjects.push(i);
      }
    }
    console.log(this.filteredProjects);
    
    this.filterResults();
  }

  filterTag(event:MatSelectChange): void{
    const tag = event.value;
    console.log(tag);
    this.filteredTags = [];
    for(const i of this.projects){
      for(const j of i.tags){
        if(j.name === tag){
          this.filteredTags.push(i);
        }
      }
    }
    console.log(this.filteredTags);
    
    this.filterResults();
  }


  filterResults():void{
    if(this.filteredTags.length > 0 && this.filteredProjects.length > 0){
      this.dataSource = this.filteredTags.filter(x =>
        this.filteredProjects.includes(x));
      
    } else if(this.filteredTags.length > 0){
      this.dataSource = this.filteredTags;
    } else { this.dataSource = this.filteredProjects}

  }

  reset(){
    this.dataSource=this.projects;
    this.filteredProjects = [];
    this.filteredTags = [];
  }

}



//TODO: sort by filters
//TODO: filter by status or tag name
//TODO: 