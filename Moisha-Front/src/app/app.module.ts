import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InterestComponent } from './components/interest/interest.component';
import { SignComponent } from './components/sign/sign.component';
import { SigninComponent } from './components/signin/signin.component';
import { FeedComponent } from './components/feed/feed.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatComponent } from './components/chat/chat.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    InterestComponent,
    SignComponent,
    SigninComponent,
    FeedComponent,
    MenuComponent,
    ChatComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
