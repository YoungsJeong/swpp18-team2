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
  }

}
