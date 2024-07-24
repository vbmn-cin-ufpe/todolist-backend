import { IsNotEmpty, Length, IsIn, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @Length(5, 50)
  name!: string;

  @IsOptional()
  @Length(0, 140)
  description?: string;

  @IsNotEmpty()
  @IsBoolean()
  completed!: boolean;

  @IsOptional()
  completionDate?: Date;

  @IsNotEmpty()
  @IsIn(['Baixa', 'Média', 'Alta'])
  priority: 'Baixa' | 'Média' | 'Alta' = 'Baixa';

  @IsNotEmpty()
  user!: string;

  /* constructor(name: string, completed: boolean, priority: 'Baixa' | 'Média' | 'Alta', userId: number, description?: string, completionDate?: Date) {
    this.name = name;
    this.completed = completed;
    this.priority = priority;
    this.userId = userId;
    this.description = description;
    this.completionDate = completionDate;
  } */

}
