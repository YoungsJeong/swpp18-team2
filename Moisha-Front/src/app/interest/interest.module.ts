import { NgModule } from '@angular/core';
import { InterestFormComponent } from './interest-form/interest-form.component';
import {SharedModule} from '../shared/shared.module';
import {InterestRoutingModule} from './interest-routing.module';
import { InterestCreateComponent } from './interest-create/interest-create.component';
import { InterestHomeComponent } from './interest-home/interest-home.component';
import { InterestFeedComponent } from './interest-feed/interest-feed.component';
import {FeedModule} from '../feed/feed.module';
import { InterestComponent } from './interest/interest.component';
import { InterestDetailComponent } from './interest-detail/interest-detail.component';
import { InterestPeopleListComponent } from './interest-people-list/interest-people-list.component';
import { InterestPeopleComponent } from './interest-people/interest-people.component';
import { InterestPeopleDetailComponent } from './interest-people-detail/interest-people-detail.component';

@NgModule({
  imports: [
    SharedModule, InterestRoutingModule, FeedModule],
  declarations: [InterestFormComponent, InterestCreateComponent, InterestHomeComponent, InterestFeedComponent,
    InterestComponent, InterestDetailComponent, InterestPeopleListComponent, InterestPeopleComponent,  InterestPeopleDetailComponent],
  entryComponents:[InterestPeopleDetailComponent],
  exports: [InterestPeopleDetailComponent]
})
export class InterestModule { }
