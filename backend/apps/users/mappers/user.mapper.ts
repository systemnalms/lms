import { User } from '../entities/user.entity';

export type SafeUser = Omit<User, 'password'>;

export function toSafeUser(user: User): SafeUser {
  const safeUser = { ...user } as Partial<User>;
  delete safeUser.password;
  return safeUser as SafeUser;
}
