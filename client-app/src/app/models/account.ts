export type Account = {
  id: string;
  email: string;
  token: string | null;
};

export type LoginDto = {
  email: string;
  password: string;
};
