import { User } from '@/entities/auth/type';

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (userData: User) => void;
    clearUser: () => void;
}
