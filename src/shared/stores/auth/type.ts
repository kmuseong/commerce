export interface User {
    id: string;
    email: string;
    isSeller: boolean;
    nickname: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (userData: User) => void;
    clearUser: () => void;
}
