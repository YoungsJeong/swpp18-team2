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
  articleTags: ArticleTag[];
  interestID: number;
  interest
  interests
  shouldLoad: Promise<boolean>
  constructor(private feedService: FeedService, private route: ActivatedRoute, private interestService: InterestService) { }

  ngOnInit() {
    this.feedService.getArticleTags().subscribe( (result) => {
      this.articleTags = result
    })
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
  getTagId() {
    const filtered = this.articleTags.filter((tag) => !tag.noShow)
    const tagIds = []
    for (const tag of filtered){
      tagIds.push(tag.id)
    }
    return tagIds
  }
  clickTag(articleTag) {
    articleTag.noShow = !articleTag.noShow
    this.feedService.getArticleByInterestByTag(this.interestID, this.getTagId(), 0, 10).subscribe(
      data => this.articles = data,
      error => this.articles = [])
  }
  fetchMoreFeed() {
    this.feedService.getArticleByInterestByTag(this.interestID, this.getTagId(), this.articles.length, 10).subscribe( (result: Article[]) => {
      for(let i = 0; i < result.length; i++) {
        if(!this.articles.find(x => x.id === result[i].id)){
          this.articles.push(result[i])
        }
      }
    })
  }
  getArticles() {
    this.articles = []
    this.feedService.getArticleByInterest(this.interestID).subscribe(
      (articles) => {
        this.articles = articles
      }
    )
  }
}
