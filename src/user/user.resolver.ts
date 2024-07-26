import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateAuthInput } from 'src/auth/dto/create-auth.input';
import { LoginInput } from '../auth/dto/update-auth.input';
import { UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService,private config:ConfigService) {}

  @Query((returns) => [User])
  Findusers() {
    const user = this.userService.findalluser();
    return user;
  }

  @Mutation(() => User)
 async Createuser(@Args('CreateUserInput') CreateUserInput: CreateUserInput) {
    try {
      const user = await this.userService.signup(CreateUserInput);
    return user;
    }
    catch (error) {
      throw new UnprocessableEntityException(error)
    }
  }
}
