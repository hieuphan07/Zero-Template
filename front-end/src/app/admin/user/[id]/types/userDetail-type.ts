// Template only, change later using the actual user type
import { TUser } from "../../types/user-type";

export interface UserDetail extends TUser {
  password: string;
}
