import * as migration_20251004_140852 from './20251004_140852';
import * as migration_20251129_152452 from './20251129_152452';
import * as migration_20260204_112318 from './20260204_112318';

export const migrations = [
  {
    up: migration_20251004_140852.up,
    down: migration_20251004_140852.down,
    name: '20251004_140852',
  },
  {
    up: migration_20251129_152452.up,
    down: migration_20251129_152452.down,
    name: '20251129_152452',
  },
  {
    up: migration_20260204_112318.up,
    down: migration_20260204_112318.down,
    name: '20260204_112318'
  },
];
