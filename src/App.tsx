import {Navigation} from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./routes/Home";
import {NotFound} from "./routes/404";
import * as React from "react";
import {useEffect, useState} from "react";
import {signInWithPopup, signOut, User, UserCredential} from "firebase/auth";
import {auth, googleAuth} from "./firebase-config";
import {saveAuthUser,getAuthUser} from './heplers'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User|null>(null);

  useEffect(() => {
    setLoggedInUser(getAuthUser() || null);
  }, []);

  const logIn = async () =>{
    try{
      await signInWithPopup(auth,googleAuth).then( (data: UserCredential) => {
        setLoggedInUser(data?.user);
        saveAuthUser(data?.user);
      })
    }
    catch (error) { console.error(error); }
  }

  const logOut = async () =>{

    try {
      await signOut(auth).then( () => {
        setLoggedInUser(null);
        saveAuthUser(null);
      });
    }
    catch (error) { console.error(error); }
  }

  return (
      <BrowserRouter>
        <Navigation loggedInUser={loggedInUser} logIn={logIn} logOut={logOut}/>

        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser}/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
