import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './Task';
import { ConstructableBaseEntity } from './ConstructableBaseEntity';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@Entity()
export class User extends ConstructableBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @Column({ length: 50 })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name!: string;

  @Column()
  @IsNotEmpty()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password!: string;

  @OneToMany(() => Task, task => task.user, { cascade: true })
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  
}
