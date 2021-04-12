
import { Tag } from 'src/app/models/tag.model';
import { TagService } from './../../service/tag.service';
import { ProjectService } from './../../service/project.service';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class TagsComponent implements OnInit {
  faEdit = faEdit;
  ngOnInit(): void {
    this.getAllTags();
  }


  visible = true;
  multiple = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  selectedTagNames: string[] = [];
  //store tags of current project, this will be passed to other teams
  selectedTagArr: Tag[] = [];

  @ViewChild('tagInput')
  tagInput!: any;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;


  public tagsNames: Tag[] = [];
  public tags: Tag[] = [];
  public errorDetected: boolean = false;


  constructor(public projectService: ProjectService, public tagService: TagService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tagName: string | null) => tagName ? this._filter(tagName) : this.tagsNames.slice()));
  }


  closeResult = '';

  open(content: any) {
    this.modalService.open(content);
  }

  Tag() {
    console.log(this.tags);
  }

  getAllTags() {
    this.tagService.getAllTags().subscribe(data => {
      this.tags = data;
      data.forEach(tag => {
        this.tagsNames.push(tag);
      })
    })
  };
  private _filter(value: any): Tag[] {
    // const filterValue = value;
    const a: Tag = new Tag(0, value, '');
    return this.tagsNames.filter(tagName => tagName.name == a.name);
  }

  //tagName.indexOf(filterValue) === 0
  add(event: MatChipInputEvent): void {
    console.log('add is called')
    const input = event.input;
    const value = event.value;
    console.log('value' + value);

    if((value || '').trim()){
      this.tagsNames.forEach(names => {
        
        if (names.name === event.value)
        {
          if (!this.selectedTagNames.includes(value.trim())){
        
            this.selectedTagNames.push(value.trim());
          }
        }
      });

      

    }
    if (input) {
      input.value = '';
    }
    this.tagCtrl.setValue(null);
  }

  remove(tagName: string): void {
    const index = this.selectedTagNames.indexOf(tagName);
    if (index >= 0) {
      this.selectedTagNames.splice(index, 1);
    }
    for(let i = 0; i < this.selectedTagArr.length; i++){
      this.selectedTagArr = this.selectedTagArr.filter( e => e.name !== tagName);
    }
  }

selected(event: MatAutocompleteSelectedEvent): void {
   // let index = this.selectedTagNames.indexOf(event.option.value);
   
    if(!this.selectedTagArr.includes(event.option.value))
    {
      this.selectedTagNames.push(event.option.viewValue);
    }
  }

  //filter out own selected method
  filterSelectedTag(tag: Tag): void {
    if (!this.selectedTagArr.includes(tag)){
    this.selectedTagArr.push(tag);}
  }



}