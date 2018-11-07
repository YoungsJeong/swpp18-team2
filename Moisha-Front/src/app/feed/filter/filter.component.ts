import {Component, Input, OnInit} from '@angular/core';
import {ArticleTag} from '../../core/feed.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() tags: ArticleTag[]
  constructor() { }
  ngOnInit() {
  }

}
