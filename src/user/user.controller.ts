import {
  Body,
  Controller,
  Get,
  Post,

} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { pipe } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private userser: UserService) {}

  @Post('signUp')
  async signUp(@Body() create: CreateUserInput) {
    try {
      return await this.userser.signup(create);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Get('GetUsers')
  async GetUsers() {
    try {
      return await this.userser.findalluser();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Post('findByid')
  async findByid(@Body() id: number) {
    try {
      return await this.userser.finduser(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Post('findByemail')
  async findByemail(@Body()email:string) {
    try {
      return await this.userser.finduserbyemal(email);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}
