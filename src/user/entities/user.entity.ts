import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
@ObjectType()
@Entity('user')
export class User {
  @Field(() => Int, { nullable: true, description: 'user Id' })
  @PrimaryGeneratedColumn()
  Id: Number;

  @Column()
  @Field()
  name: string;

  @Column({unique:true})
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({nullable:true})
  @Field({nullable:true})
  confirmpassword:string;

  @Field(()=>[Task],{nullable:true})
  @OneToMany(() => Task, Task=>Task.user)
  taskId:[Task]
}
