import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { ConstructableBaseEntity } from './ConstructableBaseEntity';
import { IsOptional, Length, IsEnum, IsDate, IsBoolean, IsString, IsUUID } from 'class-validator';

@Entity()
export class Task extends ConstructableBaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  @Length(1, 50, { message: 'Task name must be between 1 and 50 characters' })
  name!: string;

  @Column({ length: 140, nullable: true })
  @IsOptional()
  @Length(0, 140, { message: 'Description must be up to 140 characters' })
  description?: string;

  @Column({ default: false })
  @IsBoolean({ message: 'Completed must be a boolean value' })
  completed!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  @IsDate({ message: 'Completion date must be a valid date' })
  completionDate?: Date;

  @Column({ type: 'enum', enum: ['Baixa', 'Média', 'Alta'], default: 'Baixa' })
  @IsEnum(['Baixa', 'Média', 'Alta'], { message: 'Priority must be one of the following: Baixa, Média, Alta' })
  priority!: 'Baixa' | 'Média' | 'Alta';

  @ManyToOne(() => User, user => user.tasks)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
