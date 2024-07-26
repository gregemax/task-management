import {
  Controller,
  Post,
  Request,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/create-task.input';
import { controllerGurd } from 'src/auth/entities/guard';
import { UpdateTaskInput } from './dto/update-task.input';

@Controller('task')
export class TaskController {
  constructor(private taskservice: TaskService) {}

  @UseGuards(controllerGurd)
  @Post('createTask')
  async createtask(@Request() id: Number, @Body() body: CreateTaskInput) {
    try {
      return this.taskservice.creatTask(id, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch('')
  updatetask(@Param('id') id: number, @Body() body: UpdateTaskInput) {
    try {
      return this.taskservice.updatetask(id, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Delete('')
  DELETE(@Param('id') id: number) {
    try {
      return this.taskservice.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('fin')
  getalltask() {
    try {
      return this.taskservice.findallTask();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Get('getonetask/:id')
  gettask(@Param('id') id: number) {
    try {
      return this.taskservice.findonetask(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
