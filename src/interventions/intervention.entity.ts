import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Device } from '../devices/device.entity';
import { UserEntity } from '../auth/user/user.entity';
import { SparePart } from '../parts/spare-part.entity';

@Entity()
export class Intervention {
  // <- assure-toi que c'est exporté
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => Device, (device) => device.interventions)
  device: Device;

  @ManyToOne(() => UserEntity, (user) => user.interventions)
  user: UserEntity;

  @ManyToMany(() => SparePart)
  @JoinTable()
  spareParts: SparePart[];
}
