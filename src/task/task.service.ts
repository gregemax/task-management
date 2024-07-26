import { Injectable, NotFoundException, UseGuards,Request } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { error, log } from 'console';
import { Guard } from 'src/auth/entities/guard';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(User) private UserRepo: Repository<User>,
  ) { }
  


  async creatTask(id:Number,creatTaskeninty: CreateTaskInput) {
    
    const task = this.taskRepo.create(creatTaskeninty);
    task.create_at = new Date();
    const user = await this.UserRepo.findOneBy({ Id: id });

    task.user = user;

    return await this.taskRepo.save(task);
  }

  async updatetask(id: Number, greg: UpdateTaskInput) {
    greg.updated_at = new Date();
    const update = await this.taskRepo.update({ Id: id }, greg);

    if (!update.affected) {
      throw new NotFoundException(`no task found with this id ${id}`);
    }

    return 'update successfull';
  }

  findallTask() {
    const tasks = this.taskRepo.find();
    return tasks;
  }

  async findonetask(id) {
    const task = await this.taskRepo.findOne({ where: { Id: id } });
    if (!task) {
      throw new NotFoundException(`no task found with this id ${id}`);
    }
    return task;
  }

  async delete(id) {
    const deletetask = await this.taskRepo.delete({ Id: id });
    if (!deletetask.affected) {
      throw new NotFoundException(`no task found with this id ${id}`);
    }
    return 'deleted successfull';
  }
}
