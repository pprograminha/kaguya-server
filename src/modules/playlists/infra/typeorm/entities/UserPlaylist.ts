import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { Trail } from '@modules/trails/infra/typeorm/entities/Trail';
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
import { v4 as uuid } from 'uuid';
import { Playlist } from './Playlist';

@Entity('user_playlists')
class UserPlaylist implements IUserPlaylist {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  playlist_percentage_completed: string;

  @Column()
  playlist_id: string;

  @Column()
  trail_id: string;

  @ManyToOne(() => Trail)
  @JoinColumn({ name: 'trail_id' })
  trail: ITrail;

  @ManyToOne(() => Playlist)
  @JoinColumn({ name: 'playlist_id' })
  playlist: IPlaylist;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { UserPlaylist };
