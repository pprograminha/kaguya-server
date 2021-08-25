import { storageConfig } from '@config/storage';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserPlaylist } from './UserPlaylist';

@Entity('playlists')
class Playlist implements IPlaylist {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  trail_id: string;

  @OneToMany(() => UserPlaylist, userPlaylist => userPlaylist.playlist)
  userPlaylists: IUserPlaylist[];

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

export { Playlist };
