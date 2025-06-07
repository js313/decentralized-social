import { DataSource } from 'typeorm';
import dbConfig from './db-config';

export default new DataSource({
  ...dbConfig,
  synchronize: false,
  entities: [
    './src/**/*.entity.ts', // important for CLI
  ],
  migrations: ['./src/migrations/*.ts'],
});
