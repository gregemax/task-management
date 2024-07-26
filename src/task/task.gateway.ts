import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { UpdateTaskInput } from './dto/update-task.input';
import { WsGuard } from 'src/auth/entities/guard';
import { UseGuards } from '@nestjs/common';
import { request } from 'express';
import { CreateTaskInput } from './dto/create-task.input';

@WebSocketGateway({
  cors: {
    origin: '*',
    allowedHeaders: true,
  },
})
export class TaskGateway implements OnGatewayConnection {
  constructor(private taskservice: TaskService) {}
  handleConnection(client: Socket) {
    client.emit('update', 'welcome back ');
    client.emit('update', 'welcome back ');
    client.emit('update', 'welcome back ');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createTask')
  @UseGuards(WsGuard)
  async createTask(@MessageBody() body: CreateTaskInput) {
    const req = request['user'];

 const update = await this.taskservice.creatTask(req.Id, body['body']);
    console.log(body["body"]);

    return update
  }
  @SubscribeMessage('updateTask')
  @UseGuards(WsGuard)
  async update(@MessageBody() body: UpdateTaskInput) {
   

  const update = await this.taskservice.updatetask(body['body']['id'],body['body']['update']);
    console.log();

    return  update
  }

  @SubscribeMessage('deleteTask')
  async delete(@MessageBody() id: number) {
    const Delete = await this.taskservice.delete(id);
    return Delete;
  }
}
