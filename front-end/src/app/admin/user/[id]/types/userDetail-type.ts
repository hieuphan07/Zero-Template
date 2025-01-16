// Template only, change later using the actual user type
import { User } from "../../types/user-type";

export interface UserDetail extends User {
  password: string;
}
