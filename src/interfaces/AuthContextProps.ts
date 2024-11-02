import {User} from "firebase/auth";

export interface AuthContextProps {
    user: User|null,
    logIn: () => void,
    logOut: () => void,
    isLoggedIn: () => boolean,
    ready: boolean
}
