import * as migration_20250928_151814 from './20250928_151814';

export const migrations = [
  {
    up: migration_20250928_151814.up,
    down: migration_20250928_151814.down,
    name: '20250928_151814'
  },
];
