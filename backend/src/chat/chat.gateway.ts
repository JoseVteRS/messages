import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ACTION } from './enums/actions.enum';

@WebSocketGateway({ transports: ['websocket'], cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly redis: RedisService) {}

  handleConnection(client: Socket, payload: any) {
    client.broadcast.emit('user_connected', 'hola');
    this.redis.getClient().set(`user-socket--${client.id}`, client.id);
    console.log(`Client with ${client.id} ID has been connected`);
  }

  handleDisconnect(client: Socket) {
    this.redis.getClient().del(`user-socket--${client.id}`);
    console.log(`Client with ${client.id} ID has been disconnected`);
  }

  @SubscribeMessage(ACTION.ONE_TO_ONE)
  handleOneToOneMessage(client: Socket, payload: any) {}

  @SubscribeMessage(ACTION.ONE_TO_ALL)
  handleOneToAllmMessage(client: Socket, payload: any) {
    this.wss.emit(ACTION.ONE_TO_ALL, {
      message: payload,
      id: client.id,
    });
    console.log(`Message sended ONE_TO_ALL by client ${client.id}`);
  }

  @SubscribeMessage(ACTION.ONE_TO_ALL_ROOM)
  handleOneToAllRoomMessage(client: Socket, payload: any) {}

  @SubscribeMessage(ACTION.CREATE_ROOM)
  handleCreateRoom(client: Socket, roomName: string) {
    client.join(roomName);
    console.log(`Room created CREATE_ROOM with name ${roomName}`);
  }

  @SubscribeMessage(ACTION.DELETE_ROOM)
  handleDeleteRoomMessage(client: Socket, roomName: string) {
    client.leave(roomName);
  }
}
