import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-project-login',
  templateUrl: './project-login.component.html',
  styleUrls: ['./project-login.component.css']
})
export class ProjectLoginComponent implements OnInit {

  constructor(private route: Router,) { }

  ngOnInit(): void {
  }

  login() {
    this.route.navigate(['viewProject'])
  }
  
}
// login():void{
// this.route.navigate([''])
