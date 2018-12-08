import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedComponent} from './feed/feed.component';
import {HomeComponent} from './home/home.component';
import {ArticleCreateComponent} from './article-create/article-create.component';
import {ArticleEditComponent} from './article-edit/article-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FeedComponent
      },
      {
        path: 'create',
        component: ArticleCreateComponent
      },
      {
        path: ':id/edit',
        component: ArticleEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {}
