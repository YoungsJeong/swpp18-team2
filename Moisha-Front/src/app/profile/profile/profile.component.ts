import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {Interest, InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  interests: Interest[]
  constructor(public auth: AuthService, private router: Router, private interestService: InterestService) { }
  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
    this.interestService.getUserInterests().subscribe( interests =>
    this.interests = interests)
  }
  searchInterest(keyword: string) {
    if (!keyword) keyword = ''
    this.router.navigate(['search', {keyword: keyword}])
  }
}
