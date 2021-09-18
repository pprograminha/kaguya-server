import { Exclude, Expose } from 'class-transformer';
import { UserTrail } from '@modules/trails/infra/typeorm/entities/UserTrail';
import { IUser } from '@modules/users/domain/entities/IUser';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { storageConfig } from '@config/storage';
import { PlatformUserRole } from './PlatformUserRole';

@Entity('users')
class User implements IUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @OneToMany(() => PlatformUserRole, platformUserRole => platformUserRole.user)
  platformUserRoles: PlatformUserRole[];

  @OneToMany(() => UserTrail, userTrail => userTrail.user)
  userTrails: UserTrail[];

  @Column()
  username: string;

  @Column()
  enabled: boolean;

  @Exclude()
  @Column()
  password: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    const providersUrl = {
      s3: 'https://s3.com',
      disk: `${process.env.APP_API_URL}/static/${this.avatar}`,
    };

    return providersUrl[storageConfig.driver];
  }

  avatar_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
export { User };
