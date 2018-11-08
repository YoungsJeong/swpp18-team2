import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {Comment} from '../../core/reply.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../core/feed.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment
  @Input() user
  @Output() write =  new EventEmitter()
  @Output() delete = new EventEmitter()
  @Output() edit = new EventEmitter()
  isClicked: boolean
  payload: any

  constructor() { }
  ngOnInit() { }

  commentClicked() {
    this.isClicked = !this.isClicked
  }
  writeReply(payload) {
    this.write.emit(payload)
  }
  deleteReply(comment){
    event.stopPropagation();
    this.delete.emit(comment)
  }
  editReply(comment){
    event.stopPropagation();
    this.edit.emit(comment)
  }
}

