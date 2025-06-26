import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UploadedFile } from './entities/uploaded-file.entity';
import { UploadController } from './upload.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UploadedFile])],
    providers: [UploadService],
    controllers: [UploadController],
    exports: [UploadService],
})
export class UploadModule {} 