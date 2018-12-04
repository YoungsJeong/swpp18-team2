import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-profile-userinfo',
  templateUrl: './profile-userinfo.component.html',
  styleUrls: ['./profile-userinfo.component.css']
})
export class ProfileUserinfoComponent implements OnInit {
  @Input() user
  constructor(public auth: AuthService) { }
  ngOnInit() {
    this.auth.getUser().subscribe(user =>
    this.user = user)
  }

}
