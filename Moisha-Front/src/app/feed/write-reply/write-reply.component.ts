import {Component, Input, OnInit} from '@angular/core';
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
  pending: boolean;
  error: any;
  submitAttempt: boolean;
  replyForm: FormGroup;
  constructor(private replyService: ReplyService) { }

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
  writeReply() {

  }

}
