import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateUserBlocks1629838863337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_blocks',
        columns: [
          ...commonMigration,
          {
            name: 'block_percentage_completed',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'block_id',
            type: 'uuid',
          },
          ...commonMigrationOptions,
        ],
        foreignKeys: [
          {
            name: 'FKBlockId',
            columnNames: ['block_id'],
            referencedTableName: 'blocks',
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
    await queryRunner.dropTable('user_blocks');
  }
}
