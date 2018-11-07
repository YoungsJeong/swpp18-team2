import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-interest-create',
  templateUrl: './interest-create.component.html',
  styleUrls: ['./interest-create.component.css']
})
export class InterestCreateComponent implements OnInit {

  constructor(public auth: AuthService, private interestService: InterestService, private route: Router) { }
  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
  }
  searchInterest(keyword: string) {
    if (!keyword) keyword = ''
    this.route.navigate(['search', {keyword: keyword}])
  }
  createInterest(payload) {
    this.interestService.createInterest(payload).subscribe((interest) =>{
      console.log('created :' + interest)
    })
  }
}
