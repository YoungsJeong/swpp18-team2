import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedService} from '../../core/feed.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  interestID: number;
  constructor(public auth: AuthService, private feedService: FeedService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.interestID = +this.route.snapshot.paramMap.get('id')
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser()
  }
  createArticle(payload) {
    payload.author = this.auth.user.id
    this.feedService.createArticle(payload).subscribe((interest) => {
      this.router.navigate(['/'])
    })
  }

}
