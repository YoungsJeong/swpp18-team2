import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../core/feed.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  @Input() articles: Article[]
  constructor() { }

  ngOnInit() {
  }

}
