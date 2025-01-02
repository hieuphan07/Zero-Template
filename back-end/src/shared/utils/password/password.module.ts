import { Module } from '@nestjs/common';
import { BcryptPasswordService } from './bcrypt-password.service';

@Module({
  providers: [
    {
      provide: 'IPasswordHash',
      useClass: BcryptPasswordService,
    },
  ],
  exports: ['IPasswordHash'],
})
export class PasswordModule {}
