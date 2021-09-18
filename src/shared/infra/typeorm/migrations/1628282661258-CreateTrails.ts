import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateTrails1628282661258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trails',
        columns: [
          ...commonMigration,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          ...commonMigrationOptions,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trails');
  }
}
