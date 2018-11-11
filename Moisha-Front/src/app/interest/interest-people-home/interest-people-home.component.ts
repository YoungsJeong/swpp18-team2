import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../core/auth.service';
import {UserService} from '../../core/user.service';
import {Interest} from '../../core/interest.service';

@Component({
  selector: 'app-interest-people-home',
  templateUrl: './interest-people-home.component.html',
  styleUrls: ['./interest-people-home.component.css']
})
export class InterestPeopleHomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private auth: AuthService, private userService: UserService) { }
  users = [];
  interestID: number;
  ngOnInit() {
    alert('here')
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
    alert('here')
    this.interestID = +this.route.snapshot.paramMap.get('id')
    alert('here')
    this.getUsers()
  }
  getUsers() {
    this.userService.getUserByInterest(this.interestID, 3).subscribe((result) => {
      this.users = result
      console.log(result)
    })
  }
}
