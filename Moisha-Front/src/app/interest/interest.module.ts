import { NgModule } from '@angular/core';
import { InterestFormComponent } from './interest-form/interest-form.component';
import {SharedModule} from '../shared/shared.module';
import {InterestRoutingModule} from './interest-routing.module';
import { InterestCreateComponent } from './interest-create/interest-create.component';

@NgModule({
  imports: [
    SharedModule, InterestRoutingModule
  ],
  declarations: [InterestFormComponent, InterestCreateComponent]
})
export class InterestModule { }
