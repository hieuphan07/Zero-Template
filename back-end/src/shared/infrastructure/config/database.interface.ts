export interface DatabaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getTypeORMSync(): boolean;
  getTypeORMLogging(): boolean;
  getTypeORMMigrationsRun(): boolean;
}
