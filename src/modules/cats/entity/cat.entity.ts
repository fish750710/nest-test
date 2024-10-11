/**
 * TypeORM
 * 對應資料庫表
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn() // 自動生成
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
