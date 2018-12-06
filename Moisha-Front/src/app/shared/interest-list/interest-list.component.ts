import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Interest, InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-interest-list',
  templateUrl: './interest-list.component.html',
  styleUrls: ['./interest-list.component.css']
})
export class InterestListComponent implements OnInit {
  @Input() interests: Interest[]
  numberToShow: number
  constructor() { }

  ngOnInit() {
    this.numberToShow = this.interests.length >= 5 ? 5 : this.interests.length;
  }
  showMoreInterests() {
    this.numberToShow = this.interests.length >= this.numberToShow ? this.numberToShow + 5 : this.interests.length;
  }

}
