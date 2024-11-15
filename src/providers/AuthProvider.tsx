import React, {
    createContext,
    useContext,
    useState,
    useLayoutEffect,
} from 'react';
import { getAuthUser, saveAuthUser } from '../heplers';
import { signInWithPopup, signOut, User, UserCredential } from 'firebase/auth';
import { auth, googleAuth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

export interface AuthContextProps {
    user: User | null;
    logIn: () => void;
    logOut: () => void;
    isLoggedIn: () => boolean;
    ready: boolean;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    logIn: () => {},
    logOut: () => {},
    isLoggedIn: () => {
        return false;
    },
    ready: false,
});

export const AuthProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const auth = getAuthUser();

        if (auth) setUser(auth);
        else setUser(null);

        setReady(true);
    }, []);

    const logIn = async () => {
        try {
            await signInWithPopup(auth, googleAuth).then(
                (data: UserCredential) => {
                    console.log(data?.user);
                    saveAuthUser(data?.user);
                    setUser(data?.user);
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth).then(() => {
                saveAuthUser(null);
                setUser(null);
                navigate('/');
            });
        } catch (error) {
            console.error(error);
        }
    };

    const isLoggedIn = () => {
        return user !== null;
    };

    return (
        <AuthContext.Provider
            value={
                { user, logIn, logOut, isLoggedIn, ready } as AuthContextProps
            }
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
