import { Component, OnInit } from '@angular/core';
import {Article, ArticleTag, FeedService} from '../../core/feed.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {UserService} from '../../core/user.service';
import {Interest, InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-interest-detail',
  templateUrl: './interest-detail.component.html',
  styleUrls: ['./interest-detail.component.css']
})
export class InterestDetailComponent implements OnInit {

  constructor(private feedService: FeedService, private route: ActivatedRoute,
              private auth: AuthService, private userService: UserService, private interestService: InterestService) { }
  articles: Article[] = [];
  users = [];
  articleTags = null;
  interest: Interest
  interestID: number;
  isMember = false
  buttonMessage: string
  error: boolean
  ngOnInit() {
    this.error = false
    this.interestID = +this.route.snapshot.paramMap.get('id')
    this.setJoinButton()
    this.getInterest()
    this.getArticles()
    this.getUsers()
  }
  setJoinButton() {
    this.interestService.getUserInterests().subscribe((result) => {
      for (const interest of result) {
        if (interest.id === this.interestID){
          this.isMember = true
          this.buttonMessage = '가입중'
          return
        }
        this.isMember = false
        this.buttonMessage = '가입하기'
      }
    })
  }
  getInterest() {
    this.interestService.getInterestByID(this.interestID).subscribe((result) => {
      this.interest = result
    })
  }
  subscribe() {
    if(this.isMember){
      if(confirm('관심사에서 탈퇴할까요?')){
        this.userService.addInterestToUser(this.interestID, false).subscribe((result) => {
          this.auth.setUser(result)
          this.error = false
          this.ngOnInit()
        },
          err => {
            this.error = true
          })
      }
    }
    else {
      this.userService.addInterestToUser(this.interestID, true).subscribe( (result) => {
        this.auth.setUser(result)
        this.ngOnInit()
      })
    }
  }
  getArticles() {
    this.articles = []
    this.articleTags = null;
    this.feedService.getArticleByInterest(this.interestID, undefined, 3).subscribe(
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
  getUsers() {
    this.userService.getUserByInterest(this.interestID, undefined, 3).subscribe((result) => {
      this.users = result
    })
  }

}
