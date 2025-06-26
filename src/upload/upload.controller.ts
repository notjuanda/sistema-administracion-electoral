import {
    Controller,
    Post,
    Delete,
    Param,
    UploadedFile,
    UseInterceptors,
    Body,
    Query,
    BadRequestException,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { DeleteFileDto } from './dto/delete-file.dto';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post('file')
    @ApiOperation({ summary: 'Subir un archivo de imagen' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            file: {
            type: 'string',
            format: 'binary',
            },
            category: {
            type: 'string',
            example: 'candidatos',
            },
            description: {
            type: 'string',
            example: 'Foto de perfil',
            },
        },
        required: ['file', 'category'],
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('category') category: string,
        @Body('description') description?: string,
    ): Promise<UploadFileDto> {
        if (!file) {
        throw new BadRequestException('No se subió ningún archivo');
        }
        if (!category) {
        throw new BadRequestException('La categoría es obligatoria');
        }
        return this.uploadService.uploadFile(file, category, description);
    }

    @Delete('file/:id')
    @ApiOperation({ summary: 'Eliminar un archivo por ID' })
    @ApiParam({ name: 'id', description: 'ID del archivo a eliminar' })
    async deleteFile(@Param('id', ParseIntPipe) id: number): Promise<DeleteFileDto> {
        return this.uploadService.deleteFile(id);
    }

    @Delete('file')
    @ApiOperation({ summary: 'Eliminar un archivo por URL' })
    @ApiQuery({ name: 'url', description: 'URL del archivo a eliminar' })
    async deleteFileByUrl(@Query('url') url: string): Promise<DeleteFileDto> {
        if (!url) {
        throw new BadRequestException('La URL es obligatoria');
        }
        return this.uploadService.deleteFileByUrl(url);
    }
} 