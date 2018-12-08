import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Interest} from '../../core/interest.service';

@Component({
  selector: 'app-interest-people-detail',
  templateUrl: './interest-people-detail.component.html',
  styleUrls: ['./interest-people-detail.component.css']
})
export class InterestPeopleDetailComponent implements OnInit {
  @Input() user
  constructor(private modalService: NgbActiveModal) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalService.dismiss('Cross click')
  }
}
