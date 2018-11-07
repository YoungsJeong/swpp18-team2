import {RouterModule, Routes} from '@angular/router';
import {SearchHomeComponent} from '../search/search-home/search-home.component';
import {NgModule} from '@angular/core';
import {InterestFormComponent} from './interest-form/interest-form.component';
import {InterestCreateComponent} from './interest-create/interest-create.component';

const routes: Routes = [
  {path: 'create', component: InterestCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterestRoutingModule {}
