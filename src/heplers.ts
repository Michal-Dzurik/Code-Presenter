import { User } from 'firebase/auth';

export const saveAuthUser = (user: User | null) => {
    if (!user) localStorage.removeItem('user');
    else localStorage.setItem('user', user ? JSON.stringify(user) : '');
};

export const getAuthUser = (): User | null => {
    return localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') || '')
        : null;
};
