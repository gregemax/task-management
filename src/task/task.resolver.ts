import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { log } from 'console';
import { Injectable, UseGuards } from '@nestjs/common';
import { Guard } from 'src/auth/entities/guard';

@Resolver(() => Task)
@Injectable()
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @UseGuards(Guard)
  @Mutation(() => Task)
  async creat(
    @Args('createTask') createTask: CreateTaskInput,
    @Context('req') req,
  ) {
    
    return await this.taskService.creatTask(req.user.Id,createTask);
  }

  @Query(() => [Task])
  async findTask() {
    return await this.taskService.findallTask();
  }
  @Query(() => Task)
  async findonetask(@Args('taskid') taskid: Number) {
    return await this.taskService.findonetask(taskid);
  }
  @Mutation(() => String)
  async delete(@Args('taskid') taskid: Number) {
    return await this.taskService.delete(taskid);
  }
  @Mutation(() => String)
  async update(
    @Args('taskid') taskid: Number,
    @Args('updateoptions') updateoptions: UpdateTaskInput,
  ) {
    return await this.taskService.updatetask(taskid, updateoptions);
  }
}
