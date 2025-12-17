import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Intervention } from '../interventions/intervention.entity';
import { DeviceStatus } from '../enums/device-status.enum';
import { DeviceGrade } from '../enums/device-grade.enum';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ type: 'enum', enum: DeviceStatus, default: DeviceStatus.PENDING })
  status: DeviceStatus;

  @Column({ type: 'enum', enum: DeviceGrade, default: DeviceGrade.NONE })
  grade: DeviceGrade;

  @OneToMany(() => Intervention, (intervention) => intervention.device)
  interventions: Intervention[];
}
