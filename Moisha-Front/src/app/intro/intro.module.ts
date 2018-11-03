import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro/intro.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IntroComponent, SigninComponent]
})
export class IntroModule { }
