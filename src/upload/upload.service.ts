import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile } from './entities/uploaded-file.entity';
import { UploadFileDto } from './dto/upload-file.dto';
import { DeleteFileDto } from './dto/delete-file.dto';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class UploadService {
    private readonly uploadsDir = 'uploads';
    private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
    private readonly allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];

    constructor(
        @InjectRepository(UploadedFile)
        private uploadedFileRepository: Repository<UploadedFile>,
    ) {
        this.ensureUploadsDirectory();
    }

    private async ensureUploadsDirectory(): Promise<void> {
        try {
            await fs.ensureDir(this.uploadsDir);
        } catch (error) {
            console.error('Error creating uploads directory:', error);
        }
    }

    private async ensureCategoryDirectory(category: string): Promise<string> {
        const categoryPath = path.join(this.uploadsDir, category);
        await fs.ensureDir(categoryPath);
        return categoryPath;
    }

    private generateUniqueFilename(originalName: string): string {
        const extension = path.extname(originalName);
        const nameWithoutExtension = path.basename(originalName, extension);
        const uuid = uuidv4();
        return `${uuid}-${nameWithoutExtension}${extension}`;
    }

    private async validateFile(file: Express.Multer.File): Promise<void> {
        // Validar tamaño
        if (file.size > this.maxFileSize) {
            throw new BadRequestException(`El archivo excede el tamaño máximo de ${this.maxFileSize / (1024 * 1024)}MB`);
        }

        // Validar tipo MIME
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException(`Tipo de archivo no permitido. Tipos permitidos: ${this.allowedMimeTypes.join(', ')}`);
        }

        // Validar contenido del archivo
        try {
            const fileType = await fileTypeFromBuffer(file.buffer);
            if (!fileType || !this.allowedMimeTypes.includes(fileType.mime)) {
                throw new BadRequestException('El contenido del archivo no coincide con su tipo MIME');
            }
        } catch (error) {
            throw new BadRequestException('No se pudo validar el contenido del archivo');
        }
    }

    async uploadFile(
        file: Express.Multer.File,
        category: string,
        description?: string
    ): Promise<UploadFileDto> {
        // Validar archivo
        await this.validateFile(file);

        // Crear directorio de categoría
        const categoryPath = await this.ensureCategoryDirectory(category);

        // Generar nombre único
        const filename = this.generateUniqueFilename(file.originalname);
        const filePath = path.join(categoryPath, filename);
        const relativePath = path.join(category, filename);
        const url = `/${this.uploadsDir}/${relativePath}`;

        try {
            // Guardar archivo en disco
            await fs.writeFile(filePath, file.buffer);

            // Guardar información en base de datos
            const uploadedFile = this.uploadedFileRepository.create({
                originalName: file.originalname,
                filename,
                path: relativePath,
                url,
                mimetype: file.mimetype,
                size: file.size,
                category,
                description,
            });

            const savedFile = await this.uploadedFileRepository.save(uploadedFile);

            return {
                id: savedFile.id,
                originalName: savedFile.originalName,
                filename: savedFile.filename,
                url: savedFile.url,
                mimetype: savedFile.mimetype,
                size: savedFile.size,
                category: savedFile.category,
                description: savedFile.description,
                createdAt: savedFile.createdAt,
            };
        } catch (error) {
            // Si hay error, eliminar archivo del disco si se creó
            try {
                await fs.remove(filePath);
            } catch (removeError) {
                console.error('Error removing file after upload failure:', removeError);
            }
            throw new BadRequestException('Error al guardar el archivo');
        }
    }

    async deleteFile(id: number): Promise<DeleteFileDto> {
        const file = await this.uploadedFileRepository.findOne({ where: { id } });
        
        if (!file) {
            throw new NotFoundException('Archivo no encontrado');
        }

        try {
            // Eliminar archivo del disco
            const fullPath = path.join(this.uploadsDir, file.path);
            await fs.remove(fullPath);

            // Eliminar registro de la base de datos
            await this.uploadedFileRepository.remove(file);

            return {
                id: file.id,
                filename: file.filename,
                message: 'Archivo eliminado exitosamente',
                deletedAt: new Date(),
            };
        } catch (error) {
            throw new BadRequestException('Error al eliminar el archivo');
        }
    }

    async deleteFileByUrl(url: string): Promise<DeleteFileDto> {
        const file = await this.uploadedFileRepository.findOne({ where: { url } });
        
        if (!file) {
            throw new NotFoundException('Archivo no encontrado');
        }

        return this.deleteFile(file.id);
    }

    async getFileById(id: number): Promise<UploadedFile> {
        const file = await this.uploadedFileRepository.findOne({ where: { id } });
        
        if (!file) {
            throw new NotFoundException('Archivo no encontrado');
        }

        return file;
    }

    async getFilesByCategory(category: string): Promise<UploadedFile[]> {
        return this.uploadedFileRepository.find({ where: { category } });
    }

    async getAllFiles(): Promise<UploadedFile[]> {
        return this.uploadedFileRepository.find();
    }

    async fileExists(id: number): Promise<boolean> {
        const count = await this.uploadedFileRepository.count({ where: { id } });
        return count > 0;
    }
} 