import { PlatformRoles } from '@modules/platformRoles/infra/typeorm/entities/PlatformRoles';
import { IPlatformUserRoles } from '@modules/users/domain/entities/IPlatformUserRoles';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('platform_user_roles')
export class PlatformUserRoles implements IPlatformUserRoles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_id: string;

  @Column()
  user_id: string;
  
  @ManyToOne(() => PlatformRoles)
  @JoinColumn({name: "role_id"})
  role: PlatformRoles;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    };
  };
}