import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config.service';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'src/modules/user-management/infrastructure/repositories/local-storage.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (configService: EnvironmentConfigService) => ({
        type: 'mysql',
        host: configService.getDatabaseHost(),
        port: configService.getDatabasePort(),
        username: configService.getDatabaseUser(),
        password: configService.getDatabasePassword(),
        database: configService.getDatabaseName(),
        entities: ['dist/**/*.entity.orm.js'],
        synchronize: configService.getTypeORMSync(),
        logging: configService.getTypeORMLogging(),
      }),
      dataSourceFactory: async (options) => {
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
