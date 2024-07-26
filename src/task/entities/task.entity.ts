import { ObjectType, Field, Int } from '@nestjs/graphql';
import { File } from 'src/file/entities/file.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';



@ObjectType()
@Entity('Task')
export class Task {
  @PrimaryGeneratedColumn()
  @Field(()=>Int)
  Id: Number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: 'text' })
  content: string;

  @Field()
  @Column({
    type: 'enum',
    enum: ['complented', 'not stated', 'in Progress'],
    default: 'not stated',
  })
  status: string;
  @Field()
  @Column({
    type: 'enum',
    enum: ['high', 'low', 'in Progress'],
    default: 'low',
  })
  priority: string;
  @Field()
  @Column({
    type: 'enum',
    enum: ['high', 'low', 'in Progress'],
    default: 'low',
  })
  category: string;

  @Field(() => Date)
  @Column('datetime')
  due_date: Date;

  @Field(() => Date)
  @Column({
    type: 'datetime',
  })
  create_at: Date;

  @Field(() => Date,{nullable:true})
  @Column({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Field(() => User)
  @ManyToOne(() => User, (User) => User.taskId)
  user: User;


  @Field(()=>[File],{nullable:true})
  @OneToMany(() => File,(File)=>File.taskid)
  imageid: [File];
}
