import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Comment, ReplyService} from '../../core/reply.service';

@Component({
  selector: 'app-write-reply',
  templateUrl: './write-reply.component.html',
  styleUrls: ['./write-reply.component.css']
})
export class WriteReplyComponent implements OnInit {
  @Input() comment: Comment
  @Input() articleID: number
  @Output() write = new EventEmitter();
  replyForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.createForm()
  }
  createForm() {
    this.replyForm = new FormGroup(
      {
        content: new FormControl(
          '', Validators.required)
      }
    );
  }
  get formContent() {
    return this.replyForm.get('content')
  }
  writeReply() {
    const payload = {
      content: this.formContent.value,
      article: this.articleID,
      comment: this.comment ? this.comment.id : '',
      author: ''
    }
    this.write.emit(payload)
  }

}
