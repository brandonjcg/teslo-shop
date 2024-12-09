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
