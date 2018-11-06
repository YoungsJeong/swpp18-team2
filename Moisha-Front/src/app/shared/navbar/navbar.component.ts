import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../core/auth.service';
import {Router} from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() name: string;
  @Output() search = new EventEmitter();

  keyword: string
  constructor(public auth: AuthService,
              private router: Router,
              private config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
  }
  searchInterest() {
    this.search.emit(this.keyword)
  }
  goToProfile() {
    this.router.navigate(['profile']);
  }
  goToHome() {
    this.router.navigate(['/']);
  }
}
