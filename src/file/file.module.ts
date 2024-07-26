import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { TaskModule } from 'src/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [FileResolver, FileService],
  controllers: [FileController],
})
export class FileModule {}
