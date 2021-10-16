import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { Block } from '@modules/blocks/infra/typeorm/entities/Block';
import { IClass } from '@modules/classes/domain/entities/IClass';
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
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
import { UserClass } from './UserClass';

@Entity('classes')
class Class implements IClass {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @ManyToOne(() => Block)
  @JoinColumn({ name: 'block_id' })
  block: IBlock;

  @OneToMany(() => UserClass, userClass => userClass.class)
  user_classes: IUserClass[];

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

export { Class };
