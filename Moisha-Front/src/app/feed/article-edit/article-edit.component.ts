import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Article, FeedService} from '../../core/feed.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  articleID: number;
  article: Article
  shouldLoad: Promise<boolean>
  constructor(public auth: AuthService, private feedService: FeedService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.articleID = +this.route.snapshot.paramMap.get('id')
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser()
    this.feedService.getArticleById(this.articleID).subscribe( (result) =>{
    this.article = result
    this.shouldLoad = Promise.resolve(true)
    })
  }
  editArticle(payload) {
    payload.author = this.auth.user.id
    this.feedService.editArticle(payload).subscribe((interest) =>{
      this.router.navigate(['/'])
    })
  }
}
