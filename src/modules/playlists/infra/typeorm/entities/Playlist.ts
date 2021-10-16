import { storageConfig } from '@config/storage';
import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { Block } from '@modules/blocks/infra/typeorm/entities/Block';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { Trail } from '@modules/trails/infra/typeorm/entities/Trail';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Trail)
  @JoinColumn({ name: 'trail_id' })
  trail: ITrail;

  @OneToMany(() => Block, block => block.playlist)
  blocks: IBlock[];

  @OneToMany(() => UserPlaylist, userPlaylist => userPlaylist.playlist)
  user_playlists: IUserPlaylist[];

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
