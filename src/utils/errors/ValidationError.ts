import { ValidationError as ClassValidatorError } from 'class-validator';

export class ValidationError extends Error {
  validationErrors: ClassValidatorError[];

  constructor(message: string, validationErrors: ClassValidatorError[]) {
    super(message);
    this.name = 'ValidationError';
    this.validationErrors = validationErrors;
  }
}