import { NgModule } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedComponent } from './feed/feed.component';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import {FeedRoutingModule} from './feed-routing.module';
import {IntroRoutingModule} from '../intro/intro-routing.module';
import {IntroComponent} from '../intro/intro/intro.component';
import {SigninComponent} from '../intro/signin/signin.component';

@NgModule({
  imports: [SharedModule, FeedRoutingModule],
  declarations: [ ArticleComponent, FeedListComponent, FeedComponent, HomeComponent]
})
export class FeedModule { }
