import {User} from "firebase/auth";

export interface AuthData {
    loggedInUser: User|null
}
