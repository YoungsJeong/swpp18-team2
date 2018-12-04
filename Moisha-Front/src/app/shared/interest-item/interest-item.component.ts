import {Component, Input, OnInit} from '@angular/core';
import {Interest} from '../../core/interest.service';

@Component({
  selector: 'app-interest-item',
  templateUrl: './interest-item.component.html',
  styleUrls: ['./interest-item.component.css']
})
export class InterestItemComponent implements OnInit {
  @Input() interest: Interest
  constructor() { }

  ngOnInit() {
  }

}
