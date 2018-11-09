import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../core/feed.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticleDetailComponent} from '../article-detail/article-detail.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article
  constructor(public modalService: NgbModal) { }

  ngOnInit() {
  }
  openDetail() {
    const modal = this.modalService.open(ArticleDetailComponent, {size: 'lg', backdrop: true}).componentInstance
    modal.article = this.article
  }
  textClick() {
    event.stopPropagation();
  }
}
