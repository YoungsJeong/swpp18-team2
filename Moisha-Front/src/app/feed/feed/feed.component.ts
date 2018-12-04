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
  articleTags
  //articleTags: Map<number, ArticleTag> = new Map<number, ArticleTag>()
  constructor(private feedService: FeedService, private interestService: InterestService) { }
  fetchMoreFeed() {
    this.feedService.getArticleByUser(this.articles.length, 10).subscribe( result => {
      this.articles = this.articles.concat(result)
    })
  }
  fetchMoreInterest() {
    this.interestService.getInterestSuggest(this.interests.length, 10).subscribe( result => {
      this.interests = this.interests.concat(result)
    })
  }
  ngOnInit() {
    this.fetchMoreInterest()
    this.feedService.getArticleByUser(0, 10).subscribe(
      (articles) => {
        this.articles = articles
        /*
      const articleTagMap: Map<number, ArticleTag> = new Map<number, ArticleTag>()
      for (const article of articles) {
        for (const tag of article.tags) {
          if(!articleTagMap.has(tag.id)) {
            articleTagMap.set(tag.id, tag)
          }
        }

      }
      this.articleTags = articleTagMap.values()*/
      })
  }
}
