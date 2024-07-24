import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { ConstructableBaseEntity } from './ConstructableBaseEntity';
import { IsOptional, Length, IsEnum, IsDate, IsBoolean, IsString, IsUUID } from 'class-validator';

@Entity()
export class Task extends ConstructableBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 140, nullable: true })
  description?: string;

  @Column({ default: false })
  completed!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completionDate?: Date;

  @Column({ type: 'enum', enum: ['Baixa', 'Média', 'Alta'], default: 'Baixa' })
  priority!: 'Baixa' | 'Média' | 'Alta';

  @ManyToOne(() => User, user => user.tasks)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
