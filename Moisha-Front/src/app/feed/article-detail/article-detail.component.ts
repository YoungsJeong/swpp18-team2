import {Component, Input, OnInit} from '@angular/core';
import {Article, FeedService} from '../../core/feed.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Comment, ReplyService} from '../../core/reply.service';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article
  comments: Comment[] = []
  user
  constructor(private modalServie: NgbActiveModal, private replyService: ReplyService, private authService: AuthService, private feedService: FeedService) { }
  ngOnInit() {
    this.getComments()
    this.user = this.authService.user
  }
  getComments() {
    this.comments = []
    this.replyService.getCommentsToArticle(this.article.id).subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].comment === null || result[i].comment === undefined) {
          this.comments.push(result[i])
        }
      }
    })
  }
  deleteArticle() {
    if(confirm('정말 삭제하시겠습니까?')) {
      this.feedService.deleteArticle(this.article.id).subscribe( result => {
        location.href = '/'
        this.dismiss()
      })

    }
  }
  dismiss() {
    this.modalServie.dismiss('Cross click')
  }
  writeReply(payload) {
    payload.author = this.user.id
    this.replyService.createComment(payload).subscribe((result) => {
      this.getComments()
    })
  }
  editReply(payload) {
    const newContent = prompt('Edit Content', payload.content)
    if(newContent !== null && newContent !== payload.content){
      payload.content = newContent
      const editPayload = {
        id: payload.id,
        content: newContent
      }
      this.replyService.editComment(editPayload).subscribe()
    }
  }
  deleteReply(payload) {
    if(confirm('정말 삭제하시겠습니까?')) {
      this.replyService.deleteComment(payload.id).subscribe((result) => this.getComments())
    }
  }
}
