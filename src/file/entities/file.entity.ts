import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('File')
export class File {
  @PrimaryGeneratedColumn()
  Id: Number;

  @Field(() => String)
  @Column()
  imageUrl: string;

  @Field(() => Task)
  @ManyToOne(() => Task,(Task)=>Task.imageid)
  taskid: Task;
}
