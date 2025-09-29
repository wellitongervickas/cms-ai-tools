import * as migration_20250929_172100 from './20250929_172100';

export const migrations = [
  {
    up: migration_20250929_172100.up,
    down: migration_20250929_172100.down,
    name: '20250929_172100'
  },
];
