import * as migration_20251003_222036 from './20251003_222036';

export const migrations = [
  {
    up: migration_20251003_222036.up,
    down: migration_20251003_222036.down,
    name: '20251003_222036'
  },
];
