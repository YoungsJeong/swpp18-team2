import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../core/feed.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Comment, ReplyService} from '../../core/reply.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article
  comments: Comment[] = []
  constructor(private modalServie: NgbActiveModal, private replyService: ReplyService) { }
  ngOnInit() {
    this.getComments()
  }
  getComments() {
    this.replyService.getCommentsToArticle(this.article.id).subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].comment === null || result[i].comment === undefined) {
          this.comments.push(result[i])
        }
      }
    })
  }
  dismiss() {
    this.modalServie.dismiss('Cross click')
  }
}
