import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcrypt';
import { IPasswordHash } from './password-hash.interface';

@Injectable()
export class BcryptPasswordService implements IPasswordHash {
  private readonly saltRounds: number;
  private salt: string;

  constructor() {
    const rounds = process.env.PASSWORD_HASH_SALT_ROUNDS;
    if (!rounds) {
      throw new Error('PASSWORD_HASH_SALT_ROUNDS environment variable is required');
    }
    this.saltRounds = parseInt(rounds, 10);
  }

  async hash(password: string): Promise<string> {
    if (!password) {
      throw new Error('Password is required');
    }
    if (!this.salt) {
      this.salt = await genSalt(this.saltRounds);
    }
    return hash(password, this.salt);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
      throw new Error('Password and hashed password are required');
    }
    return compare(password, hashedPassword);
  }
}
