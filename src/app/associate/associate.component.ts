import {Component, OnInit} from '@angular/core';
import {Associate} from "../models/associate";
import {AssociateService} from "./service/associate.service";
import {Page} from "../models/page";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  sortValues: string[] = ['id', 'name', 'type'];
  pageSizeOptions = [10, 15, 20];

  page$ = new Page<Associate>();

  direction = 'asc';
  sortBy = 'id';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private associateService: AssociateService) {
    this.page$.size = 15;
    this.page$.number = 0;
    this.page$.sortBy = 'id,DESC';
  }

  ngOnInit() {
    this.associateService.getAssociatePage(this.page$.number, this.page$.size, this.sortBy)
      .subscribe(data => { this.page$ = data });
  }

  setPage(incremental: number) {
    this.page$.number += incremental;
    this.ngOnInit();
  }

  getAssociates() {
    this.associateService.getAssociatePage(this.page$.number, this.page$.size, this.sortBy)
      .subscribe(data => this.page$ = data);
  }

  updateAssociate() {

  }

  deleteAssociate(id: number) {
    this.associateService.deleteAssociate(id);
  }

}
