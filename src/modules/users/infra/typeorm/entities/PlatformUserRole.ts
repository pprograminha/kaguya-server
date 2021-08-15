import { PlatformRole } from '@modules/platformRoles/infra/typeorm/entities/PlatformRole';
import { IPlatformUserRole } from '@modules/users/domain/entities/IPlatformUserRole';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('platform_user_roles')
export class PlatformUserRole implements IPlatformUserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  platform_role_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => PlatformRole)
  @JoinColumn({ name: 'platform_role_id' })
  platformRole: PlatformRole;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
