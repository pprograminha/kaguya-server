import { v4 as uuid } from 'uuid';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreatePlatformRoles1628282228931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'platform_roles',
        columns: [
          ...commonMigration,
          {
            name: 'role',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'permission',
            type: 'int',
            isUnique: true,
          },
          ...commonMigrationOptions,
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('platform_roles')
      .values([
        {
          id: uuid(),
          role: 'sub-admin',
          permission: 1,
        },
        {
          id: uuid(),
          role: 'default',
          permission: 2,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('platform_roles');
  }
}
