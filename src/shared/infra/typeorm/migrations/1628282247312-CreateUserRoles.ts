import { hashSync } from 'bcryptjs';
import 'dotenv/config';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateUserRoles1628282247312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_roles',
        columns: [
          ...commonMigration,
          {
            name: 'role_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          ...commonMigrationOptions,
        ],
        foreignKeys: [
          {
            name: 'FKRoleId',
            columnNames: ['role_id'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKUserId',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );

    const user_id = uuid();
    const role_id = uuid();
    const user_role_id = uuid();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: user_id,
          name: process.env.ADMIN_NAME || '******** *******',
          username: process.env.ADMIN_USERNAME || '**********',
          email: process.env.ADMIN_ACCESS || '********@xxxxxx.xxx',
          password: hashSync(process.env.ADMIN_PASS || '********'),
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values([
        {
          id: role_id,
          role: 'admin',
          permission: 0,
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user_roles')
      .values([
        {
          id: user_role_id,
          role_id,
          user_id,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_roles');
  }
}
