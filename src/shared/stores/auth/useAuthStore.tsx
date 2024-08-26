import { AuthState, User } from '@/shared/stores/auth/type';
import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            setUser: (userData: User) =>
                set({
                    user: userData,
                    isAuthenticated: true,
                }),
            clearUser: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: 'auth-storage',
            storage: {
                getItem: (name: string): StorageValue<AuthState> | null => {
                    const item = localStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name: string, value: StorageValue<AuthState>): void => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name: string): void => {
                    localStorage.removeItem(name);
                },
            } as PersistStorage<AuthState>,
        }
    )
);
