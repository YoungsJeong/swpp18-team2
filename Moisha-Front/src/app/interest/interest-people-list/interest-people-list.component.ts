import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../core/feed.service';

@Component({
  selector: 'app-interest-people-list',
  templateUrl: './interest-people-list.component.html',
  styleUrls: ['./interest-people-list.component.css']
})
export class InterestPeopleListComponent implements OnInit {
  @Input() users
  constructor() { }

  ngOnInit() {
  }

}
