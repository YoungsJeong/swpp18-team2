import { Component, OnInit } from '@angular/core';
import {Article, ArticleTag, FeedService} from '../../core/feed.service';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-interest-feed',
  templateUrl: './interest-feed.component.html',
  styleUrls: ['./interest-feed.component.css']
})
export class InterestFeedComponent implements OnInit {
  articles: Article[] = [];
  articleTags = null;
  interestID: number;
  interest
  interests
  shouldLoad: Promise<boolean>
  constructor(private feedService: FeedService, private route: ActivatedRoute, private interestService: InterestService) { }

  ngOnInit() {
    this.interestID = +this.route.snapshot.paramMap.get('id')
    this.getArticles()
    this.interestService.getInterestByID(this.interestID).subscribe( (result) => {
      this.interest = result
    })
    this.interestService.getInterestRecommendationById(this.interestID).subscribe((result) => {
      this.interests = result
      this.shouldLoad = Promise.resolve(true);
    })
  }
  fetchMoreFeed() {
    this.feedService.getArticleByInterest(this.interestID, this.articles.length, 10).subscribe( result => {
      this.articles = this.articles.concat(result)
    })
  }
  getArticles() {
    this.articles = []
    this.articleTags = null;
    this.feedService.getArticleByInterest(this.interestID).subscribe(
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
      }
    )
  }
}
