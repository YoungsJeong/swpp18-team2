import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro/intro.component';
import { SigninComponent } from './signin/signin.component';
import {IntroRoutingModule} from './intro-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, IntroRoutingModule],
  declarations: [IntroComponent, SigninComponent]
})
export class IntroModule { }
