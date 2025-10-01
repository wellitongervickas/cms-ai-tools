import * as migration_20251001_010516 from './20251001_010516';

export const migrations = [
  {
    up: migration_20251001_010516.up,
    down: migration_20251001_010516.down,
    name: '20251001_010516'
  },
];
