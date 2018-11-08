import { NgModule } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedComponent } from './feed/feed.component';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import {FeedRoutingModule} from './feed-routing.module';
import { FilterComponent } from './filter/filter.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommentComponent } from './comment/comment.component';
import { WriteReplyComponent } from './write-reply/write-reply.component';

@NgModule({
  imports: [SharedModule, FeedRoutingModule],
  declarations: [ ArticleComponent, FeedListComponent, FeedComponent, HomeComponent, FilterComponent, ArticleDetailComponent, CommentComponent, WriteReplyComponent],
  entryComponents:[ArticleDetailComponent],
  exports: [FilterComponent, ArticleComponent, ArticleDetailComponent, CommentComponent, FeedListComponent, WriteReplyComponent]
})
export class FeedModule { }
