export type UserProps = {
  id?: number;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
