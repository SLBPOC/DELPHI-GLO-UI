import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlgorithmsAndMitigationsService } from 'src/app/shared/services/algorithms-and-mitigations.service';

interface Tag {
  tagTitle: string,
  tagContent: string,
  tagInfo: string
}

interface TagSelect {
  id: number,
  tag: string
}

interface Controller {
  id: number,
  controller: string
}

@Component({
  selector: 'app-algorithms-and-mitigation',
  templateUrl: './algorithms-and-mitigation.component.html',
  styleUrls: ['./algorithms-and-mitigation.component.scss']
})
export class AlgorithmsAndMitigationComponent implements OnInit, AfterViewInit{

  controllerSelectOptions: string[] = [];
  tagControl: any = new FormControl(null);
  tagSelectOptions: string[] = [];
  panelOpenState = true;
  tagsDetailsData: Tag[] = [];
  tagsTotal!:number;
  tagsSelected: number | undefined;

  constructor(private service: AlgorithmsAndMitigationsService) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getTagData();
    this.getControllerSelectOptions();
    this.getTagSelectOptions();
  }
  getControllerSelectOptions() {
    this.service.getControllerSelectOptionsData().subscribe((data: Controller[]) => {
      this.controllerSelectOptions = data.map((value: Controller) => value.controller)
      console.log('controller select option data:- ', this.controllerSelectOptions)

    })
  }

  getTagSelectOptions() {
    this.service.getTagSelectOptions().subscribe((data: TagSelect[]) => {
      this.tagsTotal = data.length;
      this.tagSelectOptions = data.map((value: TagSelect) => value.tag);
      console.log('tagSelectOptions data:- ', this.tagSelectOptions)

    })
  }

  getTagData() {
    this.service.getTagsData().subscribe((data: any) => {
      this.tagsDetailsData = data;
    })
  }

  onTagSelectionChanged(event: any) {
    this.tagsSelected = this.tagControl.value?.length
  }

  applyTags() {
    const payload = {
      tags: this.tagControl.value
    }
    this.service.applyTags(payload).subscribe((data: any) => {
    })
  }

  saveTags() {
    const payload = {
      tags: this.tagControl.value
    }
    this.service.saveTags(payload).subscribe((data: any) => {
    })
  }

  refreshTags() {
    const payload = {
      tags: this.tagControl.value
    }
    this.service.refreshTags(payload).subscribe((data: any) => {
    })
  }

  networkTags() {
    const payload = {
      tags: this.tagControl.value
    }
    this.service.networkTags(payload).subscribe((data: any) => {
    })
  }

  syncTags() {
    const payload = {
      tags: this.tagControl.value
    }
    this.service.syncTags(payload).subscribe((data: any) => {
    })
  }
}