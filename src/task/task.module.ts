import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { TaskGateway } from './task.gateway';
import { JwtModule } from '@nestjs/jwt';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]),JwtModule],
  providers: [TaskResolver, TaskService, TaskGateway],
  exports:[TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
