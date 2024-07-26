import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { TaskService } from 'src/task/task.service';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FileService {
  constructor(
    private taskservise: TaskService,
    @InjectRepository(File) private fileRepo: Repository<File>,
    private configservice:ConfigService
  ) {
    v2.config({
      cloud_name: configservice.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configservice.get('CLOUDINARY_API_KEY'),
      api_secret: configservice.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: string, taskid): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(file, async (error, result) => {
        if (error) return reject(error);
        const file = this.fileRepo.create({ imageUrl: result.url });

        const task = await this.taskservise.findonetask(taskid);
        file.taskid = task;
        

        const save = await this.fileRepo.save(file)
        console.log(save);
        
        resolve(result);

      });
    });
  }
}
