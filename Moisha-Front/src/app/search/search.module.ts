import { NgModule } from '@angular/core';
import { SearchHomeComponent } from './search-home/search-home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchItemComponent } from './search-item/search-item.component';
import {SharedModule} from '../shared/shared.module';
import {SearchRoutingModule} from './search-routing.module';

@NgModule({
  imports: [
    SharedModule, SearchRoutingModule],
  declarations: [SearchHomeComponent, SearchListComponent, SearchItemComponent],
  exports: [SearchItemComponent]
})
export class SearchModule { }
