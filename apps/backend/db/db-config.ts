import { DataSourceOptions } from 'typeorm';

const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'social',
};

export default dbConfig;
