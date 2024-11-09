import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA9gIak5owd6opu-XYX6wyxirt-1u0KAjk',
    authDomain: 'code-presenter-9c91a.firebaseapp.com',
    projectId: 'code-presenter-9c91a',
    storageBucket: 'code-presenter-9c91a.appspot.com',
    messagingSenderId: '779998293913',
    appId: '1:779998293913:web:6a5d8ce1b25d0b69feed08',
    measurementId: 'G-G6NEFLBCDW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);
