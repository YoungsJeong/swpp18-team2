import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-interest-info',
  templateUrl: './interest-info.component.html',
  styleUrls: ['./interest-info.component.css']
})
export class InterestInfoComponent implements OnInit {
  @Input() interest
  constructor() { }

  ngOnInit() {
  }

}
