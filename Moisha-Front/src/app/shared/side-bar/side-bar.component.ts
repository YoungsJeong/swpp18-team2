import { Component, OnInit } from '@angular/core';
import {Interest, InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  interests: Interest[]

  constructor(private interestService: InterestService) {
  }

  ngOnInit() {
    this.getInterests()
  }

  getInterests() {
    this.interestService.getUserInterests().subscribe((result) => {
      this.interests = result
    })
  }


}
