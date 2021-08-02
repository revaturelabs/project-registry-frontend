import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { SessionVar } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public loginService: LoginServiceService) { }

  ngOnInit(): void {
  }

  // Removes the login cookie
  logout(){
    console.log(sessionStorage.getItem(SessionVar.loginKey));
    sessionStorage.removeItem(SessionVar.loginKey);
    console.log(sessionStorage.getItem(SessionVar.loginKey));
  }
}
