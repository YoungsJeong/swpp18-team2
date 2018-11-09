import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InterestPeopleDetailComponent} from '../interest-people-detail/interest-people-detail.component';

@Component({
  selector: 'app-interest-people',
  templateUrl: './interest-people.component.html',
  styleUrls: ['./interest-people.component.css']
})
export class InterestPeopleComponent implements OnInit {
  @Input() user
  constructor(public modalService: NgbModal) { }

  ngOnInit() {
  }
  openDetail() {
    const modal = this.modalService.open(InterestPeopleDetailComponent, {size: 'lg', backdrop: true}).componentInstance
    modal.user = this.user
  }
}
