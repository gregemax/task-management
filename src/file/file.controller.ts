import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileService } from './file.service';
import { controllerGurd } from 'src/auth/entities/guard';

@Controller('file')
export class FileController {
  constructor(private fileservice: FileService) {}

  @Post()
  @UseGuards(controllerGurd)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const result = await this.fileservice.uploadImage(file.path, req.user.Id);
    return {
      url: result,
    };
  }
}
