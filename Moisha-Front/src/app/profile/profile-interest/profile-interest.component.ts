import {Component, Input, OnInit} from '@angular/core';
import {Interest} from '../../core/interest.service';

@Component({
  selector: 'app-profile-interest',
  templateUrl: './profile-interest.component.html',
  styleUrls: ['./profile-interest.component.css']
})
export class ProfileInterestComponent implements OnInit {
  @Input() interests: Interest[]
  constructor() { }

  ngOnInit() {
  }

}
