import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-interest-home',
  templateUrl: './interest-home.component.html',
  styleUrls: ['./interest-home.component.css']
})
export class InterestHomeComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe();
  }
  searchInterest(keyword?: string) {
    if (!keyword) keyword = ''
    this.router.navigate(['search', {keyword: keyword}])
  }

}
