import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'mysql',
  host: 'sql10.freesqldatabase.com',
  port: 3306,
  username: 'sql10584998',
  password: 'hUSU31lmZi',
  database: 'sql10584998',
  entities: ['./src/models/**.ts'],
});
