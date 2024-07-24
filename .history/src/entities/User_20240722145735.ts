import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './Task';
import { ConstructableBaseEntity } from './ConstructableBaseEntity';

@Entity()
export class User extends ConstructableBaseEntity{
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ length: 50 })
  name!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  
}
