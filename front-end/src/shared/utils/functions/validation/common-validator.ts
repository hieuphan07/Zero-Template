import { REGEXP } from "@/shared/constants/regex";

const commonValidators = {
  email: (value: string): string | null => {
    if (!value) return "user-management:validation.email.required";
    if (!REGEXP.EMAIL.test(value)) {
      return "user-management:validation.email.invalid";
    }
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return "user-management:validation.password.required";
    if (value.length < 8 || value.length > 32) {
      return "user-management:validation.password.length";
    }
    if (!REGEXP.PASSWORD.test(value)) {
      return "user-management:validation.password.invalid";
    }
    return null;
  },

  phoneNumber: (value: string): string | null => {
    if (!value) return null; // Phone number is optional
    if (value.length < 10 || value.length > 15) {
      return "user-management:validation.phoneNumber.length";
    }
    if (!REGEXP.PHONE_NUMBER.test(value)) {
      return "user-management:validation.phoneNumber.invalid";
    }
    return null;
  },
};

export default commonValidators;
