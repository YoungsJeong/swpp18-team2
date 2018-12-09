import { Component, OnInit } from '@angular/core'
import { Message, MsgType } from './chat-model'
import { ChatService } from '../../core/chat.service'
import { AuthService } from '../../core/auth.service'
//import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {
  type = MsgType
  private user
  private ioConnection
  messages: Message[] = []
  private messageContent: string

  constructor(
      private chatService: ChatService, 
      private authService: AuthService
    ) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(u => {
      this.user = u
    })
    this.initIO()
  }

  private initIO(): void {
    this.chatService.initSocket()
    this.ioConnection = this.chatService.onMessage()
    .subscribe((m: Message) => {
      this.messages.push(m)
    })
  }

  public sendMessage(message: string): void {
    if(!message) {
      return
    }
    this.chatService.send({
      from: this.user,
      content: message,
      type: this.type.MSG
    })
  }

}

