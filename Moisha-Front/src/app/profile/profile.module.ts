import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUserinfoComponent } from './profile-userinfo/profile-userinfo.component';
import { ProfileComponent } from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import {ProfileRoutingModule} from './profile-routing.module';
import { ProfileInterestComponent } from './profile-interest/profile-interest.component';
import {SearchModule} from '../search/search.module';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule, SearchModule],
  declarations: [ProfileUserinfoComponent, ProfileComponent, ProfileInterestComponent]
})
export class ProfileModule { }
