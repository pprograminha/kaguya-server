const commonMigration = [
  {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
  },
];

const commonMigrationOptions = [
  {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  },
  {
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
  },
];

export { commonMigration, commonMigrationOptions };
