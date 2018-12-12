import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Message } from '../components/chat/chat-model'
import * as express from 'express'
import * as SocketIo from 'socket.io-client'

const BACKEND_URL = 'ws://13.209.77.39/';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket

  constructor() {
    this.initSocket()
  }

  public initSocket(): void {
    this.socket = SocketIo(BACKEND_URL)
  }

  public send(message: Message): void {
    this.socket.emit('message', message)
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(
      observer => {
        this.socket.on('message', data => {
          observer.next(data)
          console.log(JSON.stringify(data))
        })
      }
    )
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next())
    })
  }

}

