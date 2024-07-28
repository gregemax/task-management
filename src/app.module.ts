import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOption } from 'db/data-source';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { Request,Response } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './greg.env',

      isGlobal: true,
    }),
    UserModule,
    TypeOrmModule.forRoot(datasourceOption),
    TaskModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/user/.graphql',
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers:true
    }),
    FileModule,
    
  ],

})
export class AppModule {}
