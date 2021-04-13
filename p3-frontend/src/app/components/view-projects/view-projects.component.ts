import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ViewProjectService } from '../../service/view-project.service';
import { Project } from '../../models/project.model';
import { Tag } from '../../models/tag.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css'],
})
export class ViewProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public tag:Tag[]=[];
  public dataSource: MatTableDataSource<Project> | any ;

  public searchForm: FormGroup | undefined;
  public description = '';
  public name = '';
  public owner  = '';
  public status = '';

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
    this.searchFormInit();
    this.dataSource.filterPredicate = this.getFilterPredicate();
  
  }
  getFilterPredicate()
  {
    return(row:Project, filters:string)=>
    {
      //split string per '$' to array
      const filterArray = filters.split('$');
      const description = filterArray[0];
      const name = filterArray[1]; 
      const owner = filterArray[2]
      const status = filterArray[3];
      
      
      const matchFilter = [];

      //Fetch data from row
      const columnDescription = row.description;
      const columnName = row.name;
      const columnOwner = row.owner.username;
      const columnStatus = row.status.name;

      //verify fetching data by our searching values
      const customFilterDescription = columnDescription.toLowerCase().includes(description);
      const customFilterName = columnName.toLowerCase().includes(name);
      const customFilterOwner = columnOwner.toLowerCase().includes(owner);
      const customFilterStatus = columnStatus.toLowerCase().includes(status);

      //push boolean values into array
      matchFilter.push(customFilterDescription);
      matchFilter.push(customFilterName);
      matchFilter.push(customFilterOwner);
      matchFilter.push(customFilterStatus);

      //return true if all values in array is true
      //else return false
      return matchFilter.every(Boolean);
    }
  }

  searchFormInit()
  {
    this.searchForm = new FormGroup
    (
      {
        description: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
        name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
        owner: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
        status: new FormControl('', Validators.pattern('^[a-zA-Z ]+$'))
      }
    );
  }

  applyAnotherFilter()
  {
    const description = this.searchForm?.get('description')?.value;
    const name = this.searchForm?.get('name')?.value;
    const owner = this.searchForm?.get('owner')?.value;
    const status = this.searchForm?.get('status')?.value;

    this.description = description === null? '': description; 
    this.name = name===null? '': name;
    this.owner = owner===null?'':owner;
    this.status = status===null?'':status;

    //create string of our searching values an split by '$'
    const filterValue= this.description + '$' + this.name + '$' + this.owner + '$' + this.status + '$';
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    this.viewProjectService.GetAllProjectStatus().subscribe(data=>this.projects=data)
    console.log(this.projects)
  }
}
