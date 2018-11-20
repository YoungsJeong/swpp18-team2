import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {ChatComponent} from '../app/components/chat/chat.component'

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
    /* temporary routing for chat */
    path: 'chat',
    component: ChatComponent,
    canLoad: [AuthGuard]
  }
  /*
  {
    path: '**',
    component: NotFoundComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
