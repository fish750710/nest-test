import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
