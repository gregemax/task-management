import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: './greg.env' });
export const datasourceOption: DataSourceOptions = {
  type: 'mysql',
  host: process.env.host,
  port: 3306,
  username: process.env.tyusername,
  password: process.env.password,
  //validate:false,
  database: 'task_manager',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*js'],
  migrationsRun: true,
};
const datasorce = new DataSource(datasourceOption);

export default datasorce;
