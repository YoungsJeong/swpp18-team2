import { Component, OnInit } from '@angular/core';
import {Article, ArticleTag, FeedService} from '../../core/feed.service';
import {Interest, InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  articles: Article[] = [];
  interests: Interest[] = [];
  shouldLoad: Promise<boolean>
  constructor(private feedService: FeedService, private interestService: InterestService) { }
  fetchMoreFeed() {
    this.feedService.getArticleByUser(this.articles.length, 10).subscribe( result => {
      this.articles = this.articles.concat(result)
    })
  }

  ngOnInit() {
    this.feedService.getArticleByUser(0, 10).subscribe(
      (articles) => {
        this.articles = articles
      })
    this.interestService.getInterestRecommendation().subscribe( (result) => {
      this.interests = result
      this.shouldLoad = Promise.resolve(true)
    })
  }
}
