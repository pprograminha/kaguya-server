import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { commonMigration, commonMigrationOptions } from '../commons';

export class CreateUserPlaylists1629675668980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_playlists',
        columns: [
          ...commonMigration,
          {
            name: 'playlist_percentage_completed',
            type: 'int',
            default: 0,
          },
          {
            name: 'blocks_completed',
            type: 'int',
            default: 0,
          },
          {
            name: 'blocks_amount',
            type: 'int',
            default: 0,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'trail_id',
            type: 'uuid',
          },
          {
            name: 'playlist_id',
            type: 'uuid',
          },
          ...commonMigrationOptions,
        ],
        foreignKeys: [
          {
            name: 'FKPlaylistId',
            columnNames: ['playlist_id'],
            referencedTableName: 'playlists',
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
    await queryRunner.dropTable('user_playlists');
  }
}
