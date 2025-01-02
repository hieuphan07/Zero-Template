export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error('Email không hợp lệ');
    }
    this.value = email;
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toString(): string {
    return this.value;
  }
}
