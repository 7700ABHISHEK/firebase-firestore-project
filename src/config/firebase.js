import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKPK6U059aShogI4v1AK15SoUMvewLJ-Y",
    authDomain: "crud-app-a4240.firebaseapp.com",
    projectId: "crud-app-a4240",
    storageBucket: "crud-app-a4240.firebasestorage.app",
    messagingSenderId: "802769320835",
    appId: "1:802769320835:web:4eb13c28b0f4bcc89a94b6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)