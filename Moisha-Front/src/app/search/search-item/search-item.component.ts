import {Component, Input, OnInit} from '@angular/core';
import {Interest} from '../../core/interest.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  @Input() interest: Interest
  constructor() { }

  ngOnInit() {
  }

}
