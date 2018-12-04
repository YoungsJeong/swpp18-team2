import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {
  NgbModule,
  NgbTypeaheadModule,
  NgbDropdownModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {SideBarComponent} from './side-bar/side-bar.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbModalModule,
    InfiniteScrollModule
  ],
  declarations: [LoadingComponent, NavbarComponent, SideBarComponent],
  exports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbModalModule,
    NavbarComponent,
    SideBarComponent,
    InfiniteScrollModule
  ]
})
export class SharedModule {}
