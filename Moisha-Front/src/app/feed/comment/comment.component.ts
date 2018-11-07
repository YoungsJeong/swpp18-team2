import { Component, OnInit, Input } from '@angular/core';
import {Comment} from '../../core/reply.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment
  isClicked: boolean
  constructor() { }
  ngOnInit() { }
  commentClicked() {
    this.isClicked = !this.isClicked
  }
}
