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
  shouldLoad: Promise<boolean>;
  articleTags: ArticleTag[]
  constructor(private feedService: FeedService, private interestService: InterestService) { }
  getTagId() {
    const filtered = this.articleTags.filter((tag) => !tag.noShow)
    const tagIds = []
    for (const tag of filtered){
      tagIds.push(tag.id)
    }
    return tagIds
  }
  fetchMoreFeed() {
    this.feedService.getArticleByUserByTag(this.getTagId(), this.articles.length, 10).subscribe( result => {
      for(let i = 0; i < result.length; i++) {
        if(!this.articles.find(x => x.id === result[i].id)) {
          this.articles.push(result[i])
        }
      }
    })
  }

  clickTag(articleTag) {
    articleTag.noShow = !articleTag.noShow
    this.feedService.getArticleByUserByTag(this.getTagId(), 0, 10).subscribe(
      data => this.articles = data,
      error => this.articles = [])
  }
  ngOnInit() {
    this.feedService.getArticleTags().subscribe( (result) => {
      this.articleTags = result
    })
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
