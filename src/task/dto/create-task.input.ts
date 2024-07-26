import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsString()
  title: string;
  
  @Field()
  @IsString()
  content: string;
  
  @Field({nullable:true})
  @IsString()
  status: string;
  
  @Field({nullable:true})
  @IsString()
  priority: string;
  
  @Field({nullable:true})
  @IsString()
  category: string;
  
  @Field(() => Date)
  @IsDate()
  due_date: Date;
  
  @Field(() => Date, { nullable: true })
  @IsDate()
  create_at: Date;

}
