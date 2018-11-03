import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro/intro.component';
import { SigninComponent } from './signin/signin.component';
import {IntroRoutingModule} from './intro-routing.module';

@NgModule({
  imports: [IntroRoutingModule],
  declarations: [IntroComponent, SigninComponent]
})
export class IntroModule { }
