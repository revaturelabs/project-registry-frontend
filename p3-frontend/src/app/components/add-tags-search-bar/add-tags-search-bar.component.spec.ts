import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagsSearchBarComponent } from './add-tags-search-bar.component';

describe('AddTagsSearchBarComponent', () => {
  let component: AddTagsSearchBarComponent;
  let fixture: ComponentFixture<AddTagsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTagsSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
