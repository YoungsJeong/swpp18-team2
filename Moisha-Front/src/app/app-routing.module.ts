import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {SignupModule} from './signup/signup.module'
import {SigninComponent} from './intro/signin/signin.component';

const routes: Routes = [

  {
    path: 'intro',
    loadChildren: '../app/intro/intro.module#IntroModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    //   loadChildren: '../app/signup/signup.module#SignupModule',
    component: SignupModule, // TODO find out why loadChildren doesn't work
    canLoad: [AuthGuard]
  },
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
export class AppRoutingModule {
}
