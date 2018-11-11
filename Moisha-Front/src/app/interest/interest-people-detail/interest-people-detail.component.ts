import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interest-people-detail',
  templateUrl: './interest-people-detail.component.html',
  styleUrls: ['./interest-people-detail.component.css']
})
export class InterestPeopleDetailComponent implements OnInit {
  @Input() user
  constructor(private modalServie: NgbActiveModal) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalServie.dismiss('Cross click')
  }
}
