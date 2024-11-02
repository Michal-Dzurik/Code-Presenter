import React, {createContext, useContext, useState, useEffect} from 'react';
import {getAuthUser, saveAuthUser} from "../heplers";
import {signInWithPopup, signOut, User, UserCredential} from "firebase/auth";
import {auth, googleAuth} from "../firebase-config";
import {AuthContextProps} from "../interfaces/AuthContextProps";

const AuthContext = createContext<AuthContextProps>({
    user: null,
    logIn: () => {},
    logOut: () => {},
    isLoggedIn: () => {return false},
    ready: false
});

export const AuthProvider = ({ children }: {children:any}) => {
    const [user, setUser] = useState<User|null>(null);
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const auth = getAuthUser();

        if (auth) setUser(auth);
        else setUser(null);

        setReady(true);

    }, []);

    const logIn = async () =>{
        try{
            await signInWithPopup(auth,googleAuth).then( (data: UserCredential) => {
                console.log(data?.user);
                saveAuthUser(data?.user);
                setUser(data?.user)
            })
        }
        catch (error) { console.error(error); }
    }

    const logOut = async () =>{

        try {
            await signOut(auth).then( () => {
                saveAuthUser(null);
                setUser(null);
            });
        }
        catch (error) { console.error(error); }
    }

    const isLoggedIn = () => {
        return user !== null;
    };


    return (
        <AuthContext.Provider value={{ user, logIn, logOut, isLoggedIn, ready } as AuthContextProps}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
