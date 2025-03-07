import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBcYgz90DBnsBojeKk7brBkGcIQDvriP6A",
    authDomain: "gitanjali-sweets.firebaseapp.com",
    databaseURL: "https://gitanjali-sweets-default-rtdb.firebaseio.com",
    projectId: "gitanjali-sweets",
    storageBucket: "gitanjali-sweets.firebasestorage.app",
    messagingSenderId: "122251848545",
    appId: "1:122251848545:web:a98db7f0247815a14d3320"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

