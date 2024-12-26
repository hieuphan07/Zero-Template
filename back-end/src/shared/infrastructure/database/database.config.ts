import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { join } from 'path';
dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: `${process.env.MYSQL_HOST}`,
  port: process.env.MYSQL_TCP_PORT
    ? parseInt(process.env.MYSQL_TCP_PORT)
    : 3306,
  username: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
  entities: [join(__dirname, '../../../modules/**/*.entity.orm.{ts,js}')],
  logging:
    process.env.NODE_ENV === 'local'
      ? String(process.env.TYPEORM_LOGGING).toLowerCase() === 'true'
      : false,
  synchronize:
    process.env.NODE_ENV === 'local'
      ? String(process.env.TYPEORM_SYNCHRONIZE).toLowerCase() === 'true'
      : false,
  migrationsRun:
    process.env.NODE_ENV === 'local'
      ? String(process.env.TYPEORM_MIGRATIONSRUN).toLowerCase() === 'true'
      : false,
  migrations: ['src/shared/infrastructure/database/migrations/*.{ts,js}'],
  migrationsTableName: 'history',
  seedTracking: true,
  seeds: [join(__dirname, '../../database/seeds/*.{ts,js}')],
  factories: [join(__dirname, '../../../database/factories/*.{ts,js}')],
};

export const AppDataSource = new DataSource(options);
