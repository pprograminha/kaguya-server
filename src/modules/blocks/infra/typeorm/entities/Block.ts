import { v4 as uuid } from 'uuid';
import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { Playlist } from '@modules/playlists/infra/typeorm/entities/Playlist';
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
import { UserBlock } from './UserBlock';

@Entity('blocks')
class Block implements IBlock {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Playlist)
  @JoinColumn({ name: 'playlist_id' })
  playlist: IPlaylist;

  @OneToMany(() => UserBlock, userBlock => userBlock.block)
  userBlocks: IUserBlock[];

  @Column()
  playlist_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Block };
