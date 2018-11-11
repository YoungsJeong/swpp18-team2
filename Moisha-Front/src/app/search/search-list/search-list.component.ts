import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../core/feed.service';
import {Interest} from '../../core/interest.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input() interests: Interest[]
  constructor() { }

  ngOnInit() {
  }

}
