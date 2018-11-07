import { Component, OnInit } from '@angular/core';
import {Article, FeedService} from '../../core/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  articles: Article[] = [];
  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getArticles().subscribe((
      (articles) => {
        this.articles = articles
      }
    ))
  }
}
