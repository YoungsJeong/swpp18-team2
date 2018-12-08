import { Component, OnInit } from '@angular/core';
import {Interest, InterestService, InterestTag} from '../../core/interest.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {
  interests: Interest[]
  interestsRecommend: Interest[]
  interestTags: InterestTag[]
  shouldLoad: Promise<boolean>
  shouldLoadRecommend: Promise<boolean>
  constructor(private interestService: InterestService) { }
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
    this.interestService.searchInterestByTag('', this.getTagId()).subscribe(
      data => this.interests = data,
      error => this.interests = [])
    this.interestService.getInterestRecommendationByTag(this.getTagId()).subscribe(
      data => this.interestsRecommend = data,
      error => this.interestsRecommend = [])
  }

  ngOnInit() {
    this.interestService.getInterestTags().subscribe((result) =>
    this.interestTags = result)
    this.interestService.searchInterest('').subscribe((result) => {
    this.interests = result
    this.shouldLoad = Promise.resolve(true)
    })
    this.interestService.getInterestRecommendation().subscribe( (result) => {
      this.interestsRecommend = result
      this.shouldLoadRecommend = Promise.resolve(true)
    })
  }

}
