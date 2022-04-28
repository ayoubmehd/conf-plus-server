import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ConferenceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  afterInit() {
    this.server.on('connection', (socket) => {
      socket.on('new-user', (id: string) => {
        socket.broadcast.emit('new-peer', id);
      });
    });
  }

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {}
}
