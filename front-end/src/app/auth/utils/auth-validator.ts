import { REGEXP } from "@/shared/constants/regex";
import commonValidators from "@/shared/utils/functions/validation/common-validator";

const authValidators = {
  username: (value: string): string | null => {
    if (value.length < 2) return "common:auth.username-must-be-at-least-2-characters-long";
    if (!REGEXP.USERNAME.test(value)) {
      return "common:auth.username-invalid";
    }
    return null;
  },

  password: (value: string): string | null => {
    return commonValidators.password(value);
  },

  confirmPassword: (password: string, confirmPassword: string) => {
    if (!confirmPassword) return "common:auth.confirm-password-required";
    if (password !== confirmPassword) return "common:auth.passwords-do-not-match";
    return null;
  },
};

export default authValidators;
