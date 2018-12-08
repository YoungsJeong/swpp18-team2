import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';
import {ArticleTag} from '../../core/feed.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {
  searchResult: Interest[]
  interestTags: InterestTag[]
  shouldLoad: Promise<boolean>
  keyword: string
  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute, private interestService: InterestService) { }
  ngOnInit() {
    if(!this.auth.user || this.auth.user === null || this.auth.user === undefined)
      this.auth.getUser().subscribe(console.log);
    this.keyword =  this.route.snapshot.paramMap.get('keyword')
    this.searchInterest(this.keyword)
    this.interestService.getInterestTags().subscribe((result) =>
    this.interestTags = result)
  }
  getTagId() {
    const filtered = this.interestTags.filter((tag) => !tag.noShow)
    const tagIds = []
    for (const tag of filtered) {
      tagIds.push(tag.id)
    }
    return tagIds
  }
  clickTag(interestTag) {
    interestTag.noShow = !interestTag.noShow
    this.interestService.searchInterestByTag(this.keyword, this.getTagId()).subscribe(
      data => this.searchResult = data,
      error => this.searchResult = [])
  }
  searchInterest(keyword: string) {
    if (this.keyword !== keyword) this.keyword = keyword
    this.searchResult = []
    if (keyword === '' || keyword === null || keyword === undefined)
      keyword = ''
    this.interestService.searchInterest(keyword).subscribe((result) => {
      console.log(result)
      this.searchResult = result
      this.shouldLoad = Promise.resolve(true)
    })
  }
}
