import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {InterestCreateComponent} from './interest-create/interest-create.component';
import {InterestHomeComponent} from './interest-home/interest-home.component';
import {SearchModule} from '../search/search.module';
import {InterestFeedComponent} from './interest-feed/interest-feed.component';

const routes: Routes = [
  {
    path: '',
    component: InterestHomeComponent,
    children: [
      {
        path: 'create',
        component: InterestCreateComponent
      },
      {
        path: ':id',
        component: InterestFeedComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterestRoutingModule {}
