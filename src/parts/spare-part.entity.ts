import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  stock: number;

  @Column('float')
  price: number;
}
