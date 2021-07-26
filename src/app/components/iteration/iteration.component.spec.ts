import { ComponentFixture, TestBed } from '@angular/core/testing';
​
import { IterationComponent } from './iteration.component';
​
describe('IterationComponent', () => {
  let component: IterationComponent;
  let fixture: ComponentFixture<IterationComponent>;
​
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IterationComponent ]
    })
    .compileComponents();
  });
​
  beforeEach(() => {
    fixture = TestBed.createComponent(IterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  xit('should create', () => {

    expect(component).toBeTruthy();
  });
});