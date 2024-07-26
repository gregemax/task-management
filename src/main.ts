import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
// import { graphqlUploadExpress } from 'graphql-upload-ts';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { request, response } from 'express';
import * as cookieParser from 'cookie-parser';
//  import * as graphqlUploaderExpress from 'graphql-upload/graphqlUploaderExpress.mjs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
       whitelist: true,
      transform: true,
      exceptionFactory(errors) {
        const formatter = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', ',
          );
          return accumulator;
        }, {});
        throw new BadRequestException(formatter);
      },
    }),
  );
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFieldSize: 1000000, maxFiles: 10 }),
  );
  app.use(cookieParser());

response['secret']="hi";
  await app.listen(3000);
}
bootstrap();
