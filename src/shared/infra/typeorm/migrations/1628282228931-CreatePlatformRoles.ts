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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('platform_roles');
  }
}
