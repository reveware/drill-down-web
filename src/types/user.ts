export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserOverview {
  id: number;
  username: string;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  tagline: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}
