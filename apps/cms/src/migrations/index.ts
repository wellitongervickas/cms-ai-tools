import * as migration_20251004_140852 from './20251004_140852';

export const migrations = [
  {
    up: migration_20251004_140852.up,
    down: migration_20251004_140852.down,
    name: '20251004_140852'
  },
];
