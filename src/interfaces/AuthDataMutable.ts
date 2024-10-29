import {User} from "firebase/auth";
import {AuthData} from "./AuthData";

export interface AuthDataMutable extends AuthData{
    logIn: any ,
    logOut: any
}
