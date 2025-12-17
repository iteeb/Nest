import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './spare-part.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(SparePart)
    private partsRepository: Repository<SparePart>,
  ) {}

  findAll() {
    return this.partsRepository.find();
  }

  create(part: Partial<SparePart>) {
    const newPart = this.partsRepository.create(part);
    return this.partsRepository.save(newPart);
  }

  async update(id: number, updateData: Partial<SparePart>) {
    const part = await this.partsRepository.findOne({ where: { id } });
    if (!part) throw new NotFoundException('Pièce introuvable');
    Object.assign(part, updateData);
    return this.partsRepository.save(part);
  }

  async remove(id: number) {
    const part = await this.partsRepository.findOne({ where: { id } });
    if (!part) throw new NotFoundException('Pièce introuvable');
    return this.partsRepository.remove(part);
  }
}
