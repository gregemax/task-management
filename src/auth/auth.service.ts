import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UserService } from 'src/user/user.service';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { request, response } from 'express';
import { log } from 'console';
@Injectable()
export class AuthService {
  constructor(
    private usersernice: UserService,
    private jwtservice: JwtService,
  ) {}

  async login(password, email) {
    const user = await this.usersernice.finduserbyemal(email);
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      throw new UnauthorizedException('wronge password');
    }
    let token = await this.jwtservice.sign({ Id: user.Id, email: user.email });

    return { user, token };
  }

  logout() {
    return 'logout successfull';
  }
}
