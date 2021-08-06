import { MigrationInterface, QueryRunner, Table } from 'typeorm';
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('platform_user_roles');
  }
}
