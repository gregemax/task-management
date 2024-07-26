import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { CreateAuthInput } from './dto/create-auth.input';
import { LoginInput } from './dto/update-auth.input';
import { Injectable, UseGuards } from '@nestjs/common';
import { Guard } from './entities/guard';
import { response } from 'express';
//import { request } from 'express';

@Resolver(() => CreateAuthInput)
@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  logOut() {
    return this.authService.logout();
  }

  @Mutation(() => CreateAuthInput)
  login(@Args('CreateUserInput') CreateUserInput: LoginInput) {
    const greg = this.authService.login(
      CreateUserInput.password,
      CreateUserInput.email,
    );

    return greg;
  }
}
