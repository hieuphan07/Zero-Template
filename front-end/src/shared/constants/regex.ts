type RegExpType = {
  readonly USERNAME: RegExp;
  readonly EMAIL: RegExp;
  readonly PASSWORD: RegExp;
  readonly PHONE_NUMBER: RegExp;
};

export const REGEXP: RegExpType = {
  USERNAME: /^[a-zA-Z0-9_-]*$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  PHONE_NUMBER: /^\+?[1-9][0-9\s-]{8,13}[0-9]$/,
};
