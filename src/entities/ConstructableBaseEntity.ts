import { BaseEntity } from 'typeorm';

export class ConstructableBaseEntity extends BaseEntity {
  static construct<T extends ConstructableBaseEntity>(this: new () => T, params: Partial<T>): T {
    return Object.assign(new this(), params);
  }
}
