import { createServer, Server } from 'http'
import * as express from 'express'
import * as SocketIO from 'socket.io'


declare function require(name:string)

var http = require("http")
const PORT_NUMBER: number = 4577

export class Message {
  constructor(private fromUser: any, private content: string) {}
}

export class ChatMessage extends Message {
  constructor(fromUser: any, content: string) {
    super(fromUser, content)
  }
}

export class ChatServer {
  private port: number | string
  private app: express.Application
  private server: Server
  private io: SocketIO.server

  constructor() {
    this.app = express()
    this.port = PORT_NUMBER
    this.server = createServer(this.app)
    this.io = SocketIO(this.server)
    this.listen()
  }

  private listen(): void {
    this.app.get('/', (req, res) => {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end("Hello world!!!!\n")
    })

    this.server.listen(this.port, () => {
      this.log(`Server running at http://localhost:${this.port}`)
    })

    this.io.on('connect', (socket: any) => {
      this.log(`Connected client on port ${this.port}`)
      
      socket.on('message', (m: Message) => {
        this.log('[server][message]:'+JSON.stringify(m))
        this.io.emit('message', m)
      })

      socket.on('disconnect', () => {
        this.log('Client disconnected')
      })
    })
  }

  private log(str: string): void{
    let now = new Date()
    console.log(`[${now.getDate()}/${now.getMonth()+1}`+
      ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`+str)
  }
  
  public getApp(): express.Application {
    return this.app;
  }
}

var svr = new ChatServer()