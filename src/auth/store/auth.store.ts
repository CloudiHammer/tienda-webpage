import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { LoginAction } from '../actions/login.action';
import { CheckAuthAction } from '../actions/check-auth.action';
import { RegisterAction } from '../actions/register.action';


type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    //Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;
    //Getters
    isAdmin: () => boolean;

    //Actions
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void
    checkAuthStatus: () => Promise<boolean>;

}


export const useAuthState = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    //getters
    isAdmin: () => {
        const roles = get().user?.roles ?? [];
        return roles.includes('admin') ? true : false
    },
    register: async (email: string, password: string, name: string) => {
        try {
            const data = await RegisterAction(email, password, name);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },
    login: async (email: string, pass: string) => {

        try {
            const data = await LoginAction(email, pass);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;

        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await CheckAuthAction();
            set({
                user: user,
                token: token,
                authStatus: 'authenticated'
            })
            return true;
        } catch (error) {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })
        }
        return false;
    }

}))
