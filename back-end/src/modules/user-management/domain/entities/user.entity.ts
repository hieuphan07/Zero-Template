import { Email } from '../value-objects/email.value-object';

export class User {
  private id: number;
  private uuid: string;
  private username: string;
  private email: string;
  private password: string;
  private phoneNumber: string;
  private lastLogin: Date;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(username: string, email: string, password: string, phoneNumber?: string) {
    this.validateUsername(username);
    this.username = username;
    this.email = new Email(email)?.toString();
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Getters
  getId(): number {
    return this.id;
  }

  getUuid(): string {
    return this.uuid;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email.toString();
  }

  getPassword(): string {
    return this.password;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getLastLogin(): Date {
    return this.lastLogin;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getDeletedAt(): Date {
    return this.deletedAt;
  }

  // Setters
  setId(value: number): void {
    this.id = value;
  }

  setUuid(value: string): void {
    this.uuid = value;
  }

  setUsername(value: string): void {
    this.validateUsername(value);
    this.username = value;
    this.updateTimestamp();
  }

  setEmail(value: string): void {
    this.email = new Email(value)?.toString();
    this.updateTimestamp();
  }

  setPassword(value: string): void {
    this.password = value;
    this.updateTimestamp();
  }

  setPhoneNumber(value: string): void {
    this.phoneNumber = value;
    this.updateTimestamp();
  }

  setLastLogin(value: Date): void {
    this.lastLogin = value;
    this.updateTimestamp();
  }

  setUpdatedAt(value: Date): void {
    this.updatedAt = value;
  }

  setDeletedAt(value: Date): void {
    this.deletedAt = value;
  }

  // Private methods
  private validateUsername(username: string): void {
    if (!username || username.length < 2 || username.length > 150) {
      throw new Error('Username must be between 2 and 150 characters');
    }
  }

  private updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}
