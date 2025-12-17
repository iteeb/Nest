import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './auth/user/user.module';
import { PartsModule } from './parts/parts.module';
import { DevicesModule } from './devices/devices.module';
import { InterventionsModule } from './interventions/interventions.module';

import { UserEntity } from './auth/user/user.entity';
import { SparePart } from './parts/spare-part.entity';
import { Device } from './devices/device.entity';
import { Intervention } from './interventions/intervention.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, SparePart, Device, Intervention],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PartsModule,
    DevicesModule,
    InterventionsModule,
  ],
})
export class AppModule {}
