export type Account = {
  id: string;
  email: string;
  token: string | null;
  roles: string[];
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  password: string;
  passwordRepeat: string;
};
