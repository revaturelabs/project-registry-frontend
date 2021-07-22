import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagsAddedTagsComponent } from './add-tags-added-tags.component';

describe('AddTagsAddedTagsComponent', () => {
  let component: AddTagsAddedTagsComponent;
  let fixture: ComponentFixture<AddTagsAddedTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTagsAddedTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagsAddedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
