import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class DataGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('joystick-data')
  handleJoystickData(client: any, data: any): void {
    // Hier können Sie die empfangenen Daten verarbeiten
    // und sie an alle verbundenen Clients weiterleiten
    this.server.emit('new-data', data);
  }
}
