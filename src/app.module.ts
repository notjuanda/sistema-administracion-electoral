import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SeccionModule } from './seccion/seccion.module';
import { CargoModule } from './cargo/cargo.module';
import { EleccionModule } from './eleccion/eleccion.module';
import { PartidoPoliticoModule } from './partido-politico/partido-politico.module';
import { CandidatoModule } from './candidato/candidato.module';
import { CandidaturaModule } from './candidatura/candidatura.module';
import { UploadModule } from './upload/upload.module';
import { RecintoModule } from './recinto/recinto.module';
import { MesaModule } from './mesa/mesa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        logging: configService.get('DB_LOGGING') === 'true',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    SeccionModule,
    CargoModule,
    EleccionModule,
    PartidoPoliticoModule,
    CandidatoModule,
    CandidaturaModule,
    UploadModule,
    RecintoModule,
    MesaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
