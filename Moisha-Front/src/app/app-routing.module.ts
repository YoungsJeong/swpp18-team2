import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {InterestListComponent} from './shared/interest-list/interest-list.component';
import {ChatComponent} from './component/chat/chat.component';

const routes: Routes = [

  {
    path: 'intro',
    loadChildren: '../app/intro/intro.module#IntroModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: '../app/signup/signup.module#SignupModule',
    canLoad: [AuthGuard]
  },
  {
    path: '',
    loadChildren: '../app/feed/feed.module#FeedModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: '../app/search/search.module#SearchModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'interest',
    loadChildren: '../app/interest/interest.module#InterestModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: '../app/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard]
  },
  /*
  {
    path: '**',
    component: NotFoundComponent
  }*/
  {
    path: 'chat',
    component: ChatComponent,
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
