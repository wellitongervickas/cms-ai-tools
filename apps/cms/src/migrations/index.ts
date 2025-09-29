import * as migration_20250928_194114 from './20250928_194114';
import * as migration_20250929_152655 from './20250929_152655';

export const migrations = [
  {
    up: migration_20250928_194114.up,
    down: migration_20250928_194114.down,
    name: '20250928_194114',
  },
  {
    up: migration_20250929_152655.up,
    down: migration_20250929_152655.down,
    name: '20250929_152655'
  },
];
