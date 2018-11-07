import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, private route: Router) { }

  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
  }
  searchInterest(keyword: string) {
    if (!keyword) keyword = ''
    this.route.navigate(['search', {keyword: keyword}])
  }
}
