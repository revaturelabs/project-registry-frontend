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
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
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
  filteredTags: Observable<string[]>;
  selectedTagNames:string[] = ["Angular"];
  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;
  
  
  public tagsNames:string[] = [];
  public tags:Tag[] = [];
  public errorDetected:boolean = false;
  constructor(public projectService: ProjectService, public tagService: TagService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tagName:string|null) => tagName ? this._filter(tagName): this.tagsNames.slice()));
    }
  printTag() {
    console.log(this.tags);
  }
  getAllTags(){
    this.tagService.getAllTags().subscribe(data => {
      this.tags = data;
      data.forEach(tag => {
        this.tagsNames.push(tag.name);
      })
    })
  };
  private _filter (value:string):string[] {
    const filterValue = value.toLowerCase();
    return this.tagsNames.filter(tagName => tagName.toLowerCase().indexOf(filterValue) === 0);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if((value || '').trim()){
      this.selectedTagNames.push(value.trim());
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
    this.selectedTagNames.push(event.option.viewValue);
    this.tagInput.nativeElement.value='';
    this.tagCtrl.setValue(null);
  }
}