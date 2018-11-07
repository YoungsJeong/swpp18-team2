import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Interest, InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  searchResult: Interest[]
  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private interestService: InterestService) { }
  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
    const keyword =  this.route.snapshot.paramMap.get('keyword')
    if (keyword != null && keyword !== '') {
      this.searchInterest(keyword)
    }
  }
  searchInterest(keyword: string) {
    if(keyword !== '' && keyword !== null && keyword !== undefined) {
      this.interestService.searchInterest(keyword).subscribe((result) => {
        console.log()
        this.searchResult = result
        this.router.navigate(['search', {keyword: keyword}])
      })
    }
    else this.searchResult = []
  }
}
