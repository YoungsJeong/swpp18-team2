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
    this.feedService.getArticleByUser(10).subscribe(
      (articles) => {
        this.articles = articles
        const articleTagMap: Map<number, ArticleTag> = new Map<number, ArticleTag>()
        for (const article of articles) {
          for (const tag of article.tags) {
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
