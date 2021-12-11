import { v4 as uuid } from 'uuid';
import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { Playlist } from '@modules/playlists/infra/typeorm/entities/Playlist';
import { IUser } from '@modules/users/domain/entities/IUser';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Block } from './Block';

@Entity('user_blocks')
class UserBlock implements IUserBlock {
  @PrimaryColumn()
  id: string;

  @Column()
  block_progress_percentage: number;

  @Column()
  user_id: string;

  @ManyToOne(() => Block)
  @JoinColumn({ name: 'block_id' })
  block: IBlock;

  @ManyToOne(() => Playlist)
  @JoinColumn({ name: 'playlist_id' })
  playlist: IPlaylist;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: IUser;

  @Column()
  playlist_id: string;

  @Column()
  block_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { UserBlock };
