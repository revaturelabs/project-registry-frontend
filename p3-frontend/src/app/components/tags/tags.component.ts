import { MatNativeDateModule } from '@angular/material/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from './../../service/tag.service';
import { ProjectService } from './../../service/project.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class TagsComponent implements OnInit {
  
  ngOnInit(): void {
    this.getAllTags();
  }
 

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes:number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  selectedTagNames:string[] = [];
  //store tags of current project, this will be passed to other teams
  selectedTagArr: Tag[] = [];

  @ViewChild('tagInput')
  tagInput!:any;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;
  
  
  public tagsNames:Tag[] = [];
  public tags:Tag[] = [];
  public errorDetected:boolean = false;


  constructor(public projectService: ProjectService, public tagService: TagService,config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
<<<<<<< HEAD
      map((tagName:string|null) => tagName ? this._filter(tagName): this.tagsNames.slice()));
  }


  closeResult = '';

  open(content:any) {
    this.modalService.open(content);
  }
=======
      map((tagName:Tag|null) => tagName ? this._filter(tagName): this.tagsNames.slice()));
    }
    closeResult = '';
    open(content:any) {
      this.modalService.open(content);
    }
>>>>>>> 9398d83edf79a5d9d65d2d87975f0cd50a3afc40

  Tag() {
    console.log(this.tags);
  }

  getAllTags(){
    this.tagService.getAllTags().subscribe(data => {
      this.tags = data;
      data.forEach(tag => {
        this.tagsNames.push(tag);
      })
    })
<<<<<<< HEAD
  }

  private _filter (value:string):string[] {
    const filterValue = value.toLowerCase();
    return this.tagsNames.filter(tagName => tagName.toLowerCase().indexOf(filterValue) === 0);
  }

=======
  };
  private _filter (value:any):Tag[] {
    // const filterValue = value;
    const a: Tag = new Tag(0, value, '');
    return this.tagsNames.filter(tagName => tagName.name == a.name);
  }

  //tagName.indexOf(filterValue) === 0
>>>>>>> 9398d83edf79a5d9d65d2d87975f0cd50a3afc40
  add(event: MatChipInputEvent): void {
    console.log('add is called')
    const input = event.input;
    const value = event.value;
    console.log('value' + value);
    if((value || '').trim()){
<<<<<<< HEAD
        if (!this.selectedTagNames.includes(value.trim())){
        this.selectedTagNames.push(value.trim());
      }
=======
      if (!this.selectedTagNames.includes(value.trim())){
        alert('inside');
      this.selectedTagNames.push(value.trim());
    }
>>>>>>> 9398d83edf79a5d9d65d2d87975f0cd50a3afc40
    }
    if(input) {
      input.value='';
    }
    this.tagCtrl.setValue(null);
  }

  remove(tagName:string): void {
    const index = this.selectedTagNames.indexOf(tagName);
    if(index >=0){
      this.selectedTagNames.splice(index,1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let index = this.selectedTagNames.indexOf(event.option.value);
    if(index == -1) {
      this.selectedTagNames.push(event.option.viewValue);
    }
<<<<<<< HEAD
=======
  }

  //filter out own selected method
  filterSelectedTag(tag: Tag): void {
    this.selectedTagArr.push(tag);
>>>>>>> 9398d83edf79a5d9d65d2d87975f0cd50a3afc40
  }
}