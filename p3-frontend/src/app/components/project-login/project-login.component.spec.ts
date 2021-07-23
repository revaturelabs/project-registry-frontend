import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLoginComponent } from './project-login.component';

describe('ProjectLoginComponent', () => {
  let component: ProjectLoginComponent;
  let fixture: ComponentFixture<ProjectLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
