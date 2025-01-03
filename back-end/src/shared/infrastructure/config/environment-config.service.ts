import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  // Database
  getDatabaseHost(): string {
    return this.configService.get<string>('MYSQL_HOST');
  }
  getDatabasePort(): number {
    return parseInt(this.configService.get<string>('MYSQL_TCP_PORT'));
  }
  getDatabaseUser(): string {
    return this.configService.get<string>('MYSQL_USER');
  }
  getDatabasePassword(): string {
    return this.configService.get<string>('MYSQL_PASSWORD');
  }
  getDatabaseName(): string {
    return this.configService.get<string>('MYSQL_DATABASE');
  }

  // Type ORM
  getTypeORMSync(): boolean {
    return this.configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true';
  }
  getTypeORMLogging(): boolean {
    return this.configService.get<string>('TYPEORM_LOGGING') === 'true';
  }
  getTypeORMMigrationsRun(): boolean {
    return this.configService.get<string>('TYPEORM_MIGRATIONSRUN') === 'true';
  }
}
