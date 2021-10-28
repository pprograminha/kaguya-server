import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { IRole } from '@modules/roles/domain/entities/IRole';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { UserRole } from '@modules/users/infra/typeorm/entities/UserRole';

@Entity('roles')
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  permission: number;

  @OneToMany(() => UserRole, userRole => userRole.role)
  user_roles: IUserRole[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
