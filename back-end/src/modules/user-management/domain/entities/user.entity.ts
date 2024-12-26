import { Email } from '../value-objects/email.value-object';
export class User {
  private _id: number;
  private _username: string;
  private _email: Email;
  private _password: string;
  private _phoneNumber: string;
  private _lastLogin: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    username: string,
    email: string,
    password: string,
    phoneNumber: string = null,
  ) {
    this.validateUsername(username);
    this._username = username;
    this._email = new Email(email);
    this._password = password;
    this._phoneNumber = phoneNumber;
    this._lastLogin = null;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email.toString();
  }

  get password(): string {
    return this._password;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get lastLogin(): Date {
    return this._lastLogin;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Setters with validation
  set id(value: number) {
    this._id = value;
  }

  set username(value: string) {
    this.validateUsername(value);
    this._username = value;
    this.updateTimestamp();
  }

  set email(value: string) {
    this._email = new Email(value);
    this.updateTimestamp();
  }

  set password(value: string) {
    this._password = value;
    this.updateTimestamp();
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
    this.updateTimestamp();
  }

  set lastLogin(value: Date) {
    this._lastLogin = value;
    this.updateTimestamp();
  }

  // Private methods
  private validateUsername(username: string): void {
    if (!username || username.length < 2 || username.length > 100) {
      throw new Error('Username must be between 2 and 100 characters');
    }
  }

  private updateTimestamp(): void {
    this._updatedAt = new Date();
  }
}
