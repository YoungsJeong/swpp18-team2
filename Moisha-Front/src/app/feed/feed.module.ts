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
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleEditFormComponent } from './article-edit-form/article-edit-form.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

@NgModule({
  imports: [SharedModule, FeedRoutingModule],
  declarations: [ ArticleComponent, FeedListComponent, FeedComponent, HomeComponent, FilterComponent, ArticleDetailComponent, CommentComponent, WriteReplyComponent, ArticleCreateComponent, ArticleFormComponent,
    ArticleEditFormComponent, ArticleEditComponent],
  entryComponents:[ArticleDetailComponent],
  exports: [FilterComponent, ArticleComponent, ArticleDetailComponent, CommentComponent, FeedListComponent, WriteReplyComponent, ArticleCreateComponent]
})
export class FeedModule { }
