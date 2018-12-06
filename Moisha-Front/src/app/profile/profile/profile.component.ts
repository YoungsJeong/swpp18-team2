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
  shouldLoad: Promise<boolean>;
  constructor(public auth: AuthService, private router: Router, private interestService: InterestService) { }
  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe((result) => {
        this.shouldLoad = Promise.resolve(true);
        console.log(result)
      });
    else this.shouldLoad = Promise.resolve(true);
    this.interestService.getUserInterests().subscribe( interests =>
    this.interests = interests)
  }
  searchInterest(keyword: string) {
    if (!keyword) keyword = ''
    this.router.navigate(['search', {keyword: keyword}])
  }
}
