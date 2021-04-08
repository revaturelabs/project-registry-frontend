import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ViewProjectService } from 'src/app/service/view-project.service';
import { Project } from '../../models/project.model';
import { Tag } from 'src/app/models/tag.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css'],
})
export class ViewProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public tag:Tag[]=[];
  public dataSource: MatTableDataSource<Project> | any ;
  public statusSet = new Set()

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log(event)
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
    const statusValue = event.value;
    console.log(statusValue);
  }

  filterTag(event: MatSelectChange): void{
    const statusValue = event.value;
    console.log(statusValue);
  }
}
