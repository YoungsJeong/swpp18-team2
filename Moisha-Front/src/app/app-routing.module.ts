import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [

  {
    path: 'intro',
    loadChildren: '../app/intro/intro.module#IntroModule',
    canLoad: [AuthGuard]
  },
  /*
  {
    path: 'signup',
    loadChildren: '..app/signup/signup.module#SignupModule',
    canLoad: [AuthGuard]
  },
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
