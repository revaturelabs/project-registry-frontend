import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phase } from 'src/app/models/phase';
import { Project } from 'src/app/models/project.model';
import { Role } from 'src/app/models/role.model';
import { Status } from 'src/app/models/status.model';
import { Tag } from 'src/app/models/tag.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/service/project.service';
import { ClientMessage } from './../../models/clientMessage.model';
import {Location} from '@angular/common'
import { TagService } from './../../service/tag.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ViewChild, AfterViewInit, OnChanges, DoCheck, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-tags-added-tags',
  templateUrl: './add-tags-added-tags.component.html',
  styleUrls: ['./add-tags-added-tags.component.css']
})
export class AddTagsAddedTagsComponent implements OnInit {
 public project?:Project;

  ngOnInit(): void {

  	this.project = this.projectService.getCurrentProject();
    this.selectedTagArr = this.project.tags;
    this.selectedTagArr.forEach(e => {
    this.selectedTagNames.push(e.name);
    })
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
  @Input() selectedTagArr: Tag[] = [];

  @ViewChild('tagInput')
  tagInput!: any;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;


  public tagsNames: Tag[] = [];
  public errorDetected: boolean = false;


  constructor(public router: Router, public projectService: ProjectService, public tagService: TagService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;

    
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tagName: Tag | null) => tagName ? this._filter(tagName) : this.tagsNames.slice()));
  }


  private _filter(value: any): Tag[] {
    // const filterValue = value;
    const a: Tag = new Tag(0, value, '');
    return this.tagsNames.filter(tagName => tagName.name == a.name);
  }


  remove(tagName: Tag): void {
    const index = this.selectedTagNames.indexOf(tagName.name);
    if (index >= 0) {
      this.selectedTagNames.splice(index, 1);
    }
    for(let i = 0; i < this.selectedTagArr.length; i++){
      
      this.selectedTagArr = this.selectedTagArr.filter( e => e.name !== tagName.name);
      if(this.project != undefined){
        this.project.tags = this.project.tags.filter(e=>e.name != tagName.name);
      }
    }
    console.log(this.selectedTagNames);
    
  }

}