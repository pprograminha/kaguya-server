import { IRole } from '@modules/roles/domain/entities/IRole';
import { Role } from '@modules/roles/infra/typeorm/entities/Role';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { IUser } from '@modules/users/domain/entities/IUser';
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

@Entity('user_roles')
export class UserRole implements IUserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: IRole;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: IUser;

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
