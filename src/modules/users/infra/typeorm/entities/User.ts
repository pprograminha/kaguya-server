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
import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';
import { UserPlaylist } from '@modules/playlists/infra/typeorm/entities/UserPlaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { UserClass } from '@modules/classes/infra/typeorm/entities/UserClass';
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { UserBlock } from '@modules/blocks/infra/typeorm/entities/UserBlock';
import { UserRole } from './UserRole';

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

  @OneToMany(() => UserRole, userRole => userRole.user)
  user_roles: IUserRole[];

  @OneToMany(() => UserTrail, userTrail => userTrail.user)
  user_trails: IUserTrail[];

  @OneToMany(() => UserPlaylist, userPlaylist => userPlaylist.user)
  user_playlists: IUserPlaylist[];

  @OneToMany(() => UserClass, userClass => userClass.user)
  user_classes: IUserClass[];

  @OneToMany(() => UserBlock, userBlock => userBlock.user)
  user_blocks: IUserBlock[];

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
