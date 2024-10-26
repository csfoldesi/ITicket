export type Account = {
  id: string;
  email: string;
  accessToken: string | null;
  refreshToken: string | null;
  roles: Roles[];
};

export type Profile = {
  email: string;
  roles: Roles[];
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

export enum Roles {
  Guest = "Guest",
  User = "User",
  Admin = "Admin",
}
