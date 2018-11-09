import { Component, OnInit } from '@angular/core';
import {Article, ArticleTag, FeedService} from '../../core/feed.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {UserService} from '../../core/user.service';

@Component({
  selector: 'app-interest-detail',
  templateUrl: './interest-detail.component.html',
  styleUrls: ['./interest-detail.component.css']
})
export class InterestDetailComponent implements OnInit {

  constructor(private feedService: FeedService, private route: ActivatedRoute,
              private auth: AuthService, private userService: UserService) { }
  articles: Article[] = [];
  users = [];
  articleTags = null;
  interestID: number;
  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
    this.getArticles()
    this.getUsers()
  }
  getArticles() {
    this.articles = []
    this.articleTags = null;
    this.interestID = +this.route.snapshot.paramMap.get('id')
    this.feedService.getArticleByInterest(this.interestID, 3).subscribe(
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
  getUsers() {
    this.userService.getUserByInterest(this.interestID, 3).subscribe((result) => {
      this.users = result
      console.log(result)
    })
  }

}
