import { v4 as uuid } from 'uuid';
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
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IClass } from '@modules/classes/domain/entities/IClass';
import { Block } from '@modules/blocks/infra/typeorm/entities/Block';
import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { Class } from './Class';

@Entity('user_classes')
class UserClass implements IUserClass {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: IClass;

  @ManyToOne(() => Block)
  @JoinColumn({ name: 'block_id' })
  block: IBlock;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: IUser;

  @Column()
  block_id: string;

  @Column()
  user_id: string;

  @Column()
  completed: boolean;

  @Column()
  class_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { UserClass };
