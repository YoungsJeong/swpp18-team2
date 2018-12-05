import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Interest, InterestService} from '../../core/interest.service';

@Component({
  selector: 'app-interest-suggest',
  templateUrl: './interest-list.component.html',
  styleUrls: ['./interest-list.component.css']
})
export class InterestListComponent implements OnInit {
  @Input() interests: Interest[]
  @Input() show:number
  @Output() scroll =  new EventEmitter()
  constructor() { }

  ngOnInit() {
  }
  onScrollDown(){
    this.scroll.emit()
  }

}
