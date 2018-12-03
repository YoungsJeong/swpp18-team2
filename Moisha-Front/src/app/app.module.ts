import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import {AppRoutingModule} from './app-routing.module';
import { tokenGetter } from './core/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        authScheme: 'Token ',
        whitelistedDomains: ['localhost:8000','http://ec2-13-125-100-78.ap-northeast-2.compute.amazonaws.com/' ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
