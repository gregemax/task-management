import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userrep: Repository<User>,
    
  ) {}

  async finduser(id: Number) {
    const user = await this.userrep.findOne({
      where: { Id: id },
      relations: ['taskId'],
    });
    if (!user) {
      throw new NotFoundException(`no user found with this ${id}`);
    }
    return user;
  }
  async finduserbyemal(email: string) {
    const user = await this.userrep.findOne({
      where: { email },
      relations: ['taskId'],
    });
    if (!user) {
      throw new NotFoundException(`no user found with this ${email}`);
    }
    return user;
  }

  async findalluser() {
    const user = await this.userrep.find({ relations: ['taskId'] });

    return user;
  }

  async deleteuser(Id: number) {
    const user = await this.userrep.delete({ Id });
    if (!user.affected) {
      throw new NotFoundException('no user found to delete');
    }
    return {
      success: 'success',
    };
  }
  async signup(create: CreateUserInput) {
    if (create.password != create.confirmpassword) {
      throw new UnauthorizedException('password must match confirmpassword');
    }
    const user = await this.userrep.create(create);

    user.password = await bcrypt.hash(user.password, 12);
    return this.userrep.save(user);
  }
}
