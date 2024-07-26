import { IsDate, IsString } from 'class-validator';
import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  content: string;

  @Field({ nullable: true })
  @IsString()
  status: string;

  @Field({ nullable: true })
  @IsString()
  priority: string;

  @Field({ nullable: true })
  @IsString()
  category: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  due_date: Date;
  
  @Field(() => Date, { nullable: true })
  @IsDate()
  updated_at: Date;
}
