import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateUserClasses1629839727476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_classes',
        columns: [
          ...commonMigration,
          {
            name: 'completed',
            type: 'boolean',
          },
          {
            name: 'class_id',
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
            name: 'FKUserId',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKClassId',
            columnNames: ['class_id'],
            referencedTableName: 'classes',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_classes');
  }
}
