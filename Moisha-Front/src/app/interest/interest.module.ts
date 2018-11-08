import { NgModule } from '@angular/core';
import { InterestFormComponent } from './interest-form/interest-form.component';
import {SharedModule} from '../shared/shared.module';
import {InterestRoutingModule} from './interest-routing.module';
import { InterestCreateComponent } from './interest-create/interest-create.component';
import { InterestHomeComponent } from './interest-home/interest-home.component';
import { InterestFeedComponent } from './interest-feed/interest-feed.component';
import {FeedModule} from '../feed/feed.module';

@NgModule({
  imports: [
    SharedModule, InterestRoutingModule, FeedModule
  ],
  declarations: [InterestFormComponent, InterestCreateComponent, InterestHomeComponent, InterestFeedComponent]
})
export class InterestModule { }
