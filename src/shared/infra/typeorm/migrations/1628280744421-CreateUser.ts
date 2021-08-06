import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateUser1628280744421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ...commonMigration,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'enabled',
            type: 'boolean',
          },
          {
            name: 'avatar',
            type: 'varchar',
          },
          ...commonMigrationOptions,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
