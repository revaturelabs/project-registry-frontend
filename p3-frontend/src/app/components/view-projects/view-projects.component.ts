import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';

interface IPost{
  id?:string,
  author?:String,
  title?:string,
  category?: string,
  date?:string
}

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})
export class ViewProjectsComponent implements OnInit {

  dataSource: MatTableDataSource<IPost>;
  posts: IPost[];
  displayedColumns:string[]=['id','author','title','category','date'];

  //sort not fully functional
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor() {
    this.posts=[{
      id:'1',
      author:"John Doe",
      title:"Testing tabel",
      category:"fiction",
      date:"02/23/2021 10:10:10"

    },
    {
      id:'2',
      author:"Jane Doe",
      title:"Testing tabel2",
      category:"Sports",
      date:"02/25/2021 10:10:10"

    },
    {
      id:'3',
      author:"Timmy Turner",
      title:"Testing tabel2",
      category:"MMA",
      date:"02/2/2021 10:10:10"

    },
    {
      id:'4',
      author:"Tim Whatly",
      title:"Testing tabel2",
      category:"Music",
      date:"02/5/2021 10:10:10"

    },
    {
      id:'5',
      author:"Bobby Bob",
      title:"Testing tabel2",
      category:"Tech",
      date:"02/20/2021 10:10:10"

    }]

    this.dataSource=new MatTableDataSource(this.posts)
   }

   ngOnInit(): void {


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
    }
  }


}
