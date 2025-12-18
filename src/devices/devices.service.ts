import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  findAll() {
    return this.devicesRepository.find();
  }

  create(deviceData: Partial<Device>) {
    const device = this.devicesRepository.create(deviceData);
    return this.devicesRepository.save(device);
  }

  async remove(id: number) {
    const device = await this.devicesRepository.findOne({ where: { id } });
    if (!device) throw new NotFoundException('Device not found');
    return this.devicesRepository.remove(device);
  }
}
