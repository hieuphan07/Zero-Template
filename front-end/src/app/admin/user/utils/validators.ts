export const userValidators = {
  username: (value: string): string | null => {
    if (!value) return "Username is required";
    if (value.length < 2) return "Username must be at least 2 characters";
    if (!/^[a-zA-Z0-9_-]*$/.test(value)) {
      return "Username can only contain letters, numbers, underscores and hyphens";
    }
    return null;
  },

  email: (value: string): string | null => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please provide a valid email address";
    }
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return "Password is required";
    if (value.length < 8 || value.length > 32) {
      return "Password must be between 8 and 32 characters";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character";
    }
    return null;
  },

  phoneNumber: (value: string): string | null => {
    if (!value) return null; // Phone number is optional
    if (value.length < 10 || value.length > 15) {
      return "Phone number must be between 10 and 15 characters";
    }
    if (!/^\+?[1-9][0-9\s-]{8,13}[0-9]$/.test(value)) {
      return "Please provide a valid phone number";
    }
    return null;
  },
};
