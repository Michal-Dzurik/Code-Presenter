import {Navigation} from "./components/Navigation";
import {BrowserRouter, Navigate, redirect, Route, Routes} from "react-router-dom";
import {Home} from "./routes/Home";
import {NotFound} from "./routes/404";
import * as React from "react";
import {useEffect, useState} from "react";
import {signInWithPopup, signOut, User, UserCredential} from "firebase/auth";
import {auth, googleAuth} from "./firebase-config";
import {saveAuthUser,getAuthUser} from './heplers'
import {Editor} from "./routes/Editor";
import {ShowCard} from "./routes/ShowCard";
import {AuthProvider} from "./providers/AuthProvider";

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <Navigation/>

          <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/editor/:id?" element={<Editor/>}/>

            <Route path="/cards/:id" element={<ShowCard />} />

            <Route path="/404" element={<NotFound/>} />

            <Route path="/*" element={<Navigate to="/404" replace />} />


          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
