import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateArticles1629839941499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          ...commonMigration,
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'link',
            type: 'varchar',
          },
          {
            name: 'class_id',
            type: 'uuid',
          },
          ...commonMigrationOptions,
        ],
        foreignKeys: [
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
    await queryRunner.dropTable('articles');
  }
}
