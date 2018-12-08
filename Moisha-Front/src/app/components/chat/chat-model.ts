export class Message {
  from: any
  content: string
  type: MsgType
}

export enum MsgType {
  JOIN, MSG, LEAVE
}
