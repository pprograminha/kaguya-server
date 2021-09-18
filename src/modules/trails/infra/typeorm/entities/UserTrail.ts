import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
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
import { Trail } from './Trail';

@Entity('user_trails')
class UserTrail implements IUserTrail {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  trail_id: string;

  @ManyToOne(() => Trail)
  @JoinColumn({ name: 'trail_id' })
  trail: Trail;

  @Column()
  trail_percentage_completed: number;

  @Column()
  playlists_completed: number;

  @Column()
  playlists_amount: number;

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

export { UserTrail };
