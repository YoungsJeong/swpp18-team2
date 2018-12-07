import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {InterestComponent} from '../interest/interest/interest.component';
import {ProfileUserinfoComponent} from './profile-userinfo/profile-userinfo.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
