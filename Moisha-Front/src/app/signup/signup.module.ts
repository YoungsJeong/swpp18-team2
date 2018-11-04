import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import {SignupRoutingModule} from './signup-routing.module';

@NgModule({
  imports:[SharedModule, SignupRoutingModule],
  declarations: [SignupComponent]
})
export class SignupModule { }
