import { hashSync } from 'bcryptjs';
import 'dotenv/config';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreatePlatformUserRoles1628282247312
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'platform_user_roles',
        columns: [
          ...commonMigration,
          {
            name: 'platform_role_id',
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
            columnNames: ['platform_role_id'],
            referencedTableName: 'platform_roles',
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
    const platform_role_id = uuid();
    const platform_user_role_id = uuid();

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
      .into('platform_roles')
      .values([
        {
          id: platform_role_id,
          role: 'admin',
          permission: 0,
        },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('platform_user_roles')
      .values([
        {
          id: platform_user_role_id,
          platform_role_id,
          user_id,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('platform_user_roles');
  }
}
