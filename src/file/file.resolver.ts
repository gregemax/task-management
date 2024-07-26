import { Resolver, Query, Mutation, Args, Int, Context, } from '@nestjs/graphql';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { Request, UseGuards,Response } from '@nestjs/common';
import { Guard } from 'src/auth/entities/guard';
import { log } from 'console';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
@Resolver(() => File)
export class FileResolver {
  constructor(private  fileService: FileService) {}

  @Mutation(() => File, { name: 'uploadfile' })
  async fileupload(
    @Args({ name: 'image', type: () => GraphQLUpload }) image: Upload,
    @Args({ name: 'taskid', type: () => Int }) taskid:number ,
  ) {
    const result = await this.fileService.uploadImage(image,taskid)
    log(result)
  }
}
