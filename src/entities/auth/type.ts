export interface LoginFormType {
    email: string;
    password: string;
}

export interface SignupFormType {
    email: string;
    password: string;
    nickname: string;
    isSeller: boolean;
}

export interface User {
    id: string;
    email: string;
    isSeller: boolean;
    nickname: string;
}
