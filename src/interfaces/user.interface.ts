export interface IUserSession {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  role: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password?: string;
  role: string;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
