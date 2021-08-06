import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateUserTrails1628282966132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_trails',
        columns: [
          ...commonMigration,
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'trail_id',
            type: 'uuid',
          },
          {
            name: 'avatar',
            type: 'varchar',
          },
          ...commonMigrationOptions,
        ],
        foreignKeys: [
          {
            name: 'FKUserId',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKTrailId',
            columnNames: ['trail_id'],
            referencedTableName: 'trails',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trails');
  }
}
