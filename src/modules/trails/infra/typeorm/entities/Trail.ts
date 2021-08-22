import { v4 as uuid } from 'uuid';
import { ITrail } from '@modules/trails/domain/entities/ITrail';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { storageConfig } from '@config/storage';
import { UserTrail } from './UserTrail';

@Entity('trails')
class Trail implements ITrail {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserTrail, userTrail => userTrail.trail)
  userTrail: UserTrail;

  @Column()
  avatar: string;

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

export { Trail };
