import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Intervention } from './intervention.entity';
import { Device } from '../devices/device.entity';
import { SparePart } from '../parts/spare-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intervention, Device, SparePart])],
  controllers: [InterventionsController],
  providers: [InterventionsService],
})
export class InterventionsModule {}
