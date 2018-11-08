import { Component, OnInit } from '@angular/core';
import {Article, ArticleTag, FeedService} from '../../core/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  articles: Article[] = [];
  articleTags
  //articleTags: Map<number, ArticleTag> = new Map<number, ArticleTag>()
  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getArticles().subscribe(
      (articles) => {
        this.articles = articles
        let articleTagMap: Map<number, ArticleTag> = new Map<number, ArticleTag>()
        for (let article of articles) {
          for (let tag of article.tags) {
            if(!articleTagMap.has(tag.id)) {
              articleTagMap.set(tag.id, tag)
            }
          }
        }
        this.articleTags = articleTagMap.values()
      }
    )
  }
}
