import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { TypeOrmConfigModule } from './shared/infrastructure/database/typeorm.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './shared/infrastructure/config/app.config';

@Module({
  imports: [
    TypeOrmConfigModule,
    UserManagementModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
