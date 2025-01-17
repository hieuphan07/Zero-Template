import { REGEXP } from "@/shared/constants/regex";
import commonValidators from "@/shared/utils/functions/validation/common-validator";

const userValidators = {
  username: (value: string): string | null => {
    if (!value) return "user-management:validation.username.required";
    if (value.length < 2) return "user-management:validation.username.min-length";
    if (!REGEXP.USERNAME.test(value)) {
      return "user-management:validation.username.invalid";
    }
    return null;
  },

  email: (value: string): string | null => {
    return commonValidators.email(value);
  },

  password: (value: string): string | null => {
    return commonValidators.password(value);
  },

  phoneNumber: (value: string): string | null => {
    return commonValidators.phoneNumber(value);
  },
};

export default userValidators;
