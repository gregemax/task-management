import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

//@InputType()
@ObjectType()
export class CreateAuthInput {
  @Field(() => User)
  user: any;

  @Field()
  @IsString()
  token: string;
}


