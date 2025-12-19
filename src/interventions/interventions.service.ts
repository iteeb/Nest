import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Intervention } from './intervention.entity';
import { Device } from '../devices/device.entity';
import { SparePart } from '../parts/spare-part.entity';
import { UserEntity } from '../auth/user/user.entity';
import { DeviceStatus } from '../enums/device-status.enum';
import { CreateInterventionDto } from '../auth/dto/create-intervention.dto';

@Injectable()
export class InterventionsService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(Intervention)
    private interventionRepo: Repository<Intervention>,

    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,

    @InjectRepository(SparePart)
    private partRepo: Repository<SparePart>,
  ) {}

  async create(
    dto: CreateInterventionDto,
    user: UserEntity,
  ): Promise<Intervention> {
    return this.dataSource.transaction(async (manager) => {
      const device = await manager.findOne(Device, {
        where: { id: dto.deviceId },
      });
      if (!device) throw new NotFoundException('Device not found');

      const parts = await manager.findByIds(SparePart, dto.sparePartIds);

      if (parts.length !== dto.sparePartIds.length) {
        throw new BadRequestException('Spare part not found');
      }

      for (const part of parts) {
        if (part.stock <= 0) {
          throw new BadRequestException(`Stock insuffisant pour ${part.name}`);
        }
        part.stock -= 1;
        await manager.save(part);
      }

      device.status = DeviceStatus.REPAIRING;
      await manager.save(device);

      const intervention = manager.create(Intervention, {
        description: dto.description,
        device,
        user,
        spareParts: parts,
      });

      return manager.save(intervention);
    });
  }
}
