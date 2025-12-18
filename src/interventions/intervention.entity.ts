import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { Device } from '../devices/device.entity';
import { UserEntity } from '../auth/user/user.entity';
import { SparePart } from '../parts/spare-part.entity';
import { IsArray } from 'class-validator';

@Entity()
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => Device, (device) => device.interventions)
  device: Device;

  @ManyToOne(() => UserEntity, (user) => user.interventions)
  user: UserEntity;

  @ManyToMany(() => SparePart)
  @IsArray()
  sparePartIds: number[];
}
