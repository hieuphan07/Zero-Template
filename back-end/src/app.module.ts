import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { TypeOrmConfigModule } from './shared/infrastructure/database/typeorm.module';

@Module({
  imports: [TypeOrmConfigModule, UserManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
