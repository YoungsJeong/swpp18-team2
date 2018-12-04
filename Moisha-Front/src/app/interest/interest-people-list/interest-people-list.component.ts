import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from '../../core/feed.service';

@Component({
  selector: 'app-interest-people-list',
  templateUrl: './interest-people-list.component.html',
  styleUrls: ['./interest-people-list.component.css']
})
export class InterestPeopleListComponent implements OnInit {
  @Input() users
  @Output() scroll =  new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  onScrollDown(){
    this.scroll.emit()
  }

}
