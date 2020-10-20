import {Component, OnInit} from '@angular/core';
import { Auth } from 'aws-amplify';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project-registry-frontend';
  $user: Observable<any>;

  ngOnInit(): void {
    this.$user = fromPromise(Auth.currentUserPoolUser());
  }
}
