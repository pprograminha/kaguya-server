import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

import { IPlatformRole } from '@modules/platformRoles/domain/entities/IPlatformRole';
import { IPlatformUserRole } from '@modules/users/domain/entities/IPlatformUserRole';
import { PlatformUserRole } from '@modules/users/infra/typeorm/entities/PlatformUserRole';

@Entity('platform_roles')
export class PlatformRole implements IPlatformRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  permission: number;

  @OneToMany(
    () => PlatformUserRole,
    platformUserRole => platformUserRole.platform_role,
  )
  platform_user_roles: IPlatformUserRole[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
