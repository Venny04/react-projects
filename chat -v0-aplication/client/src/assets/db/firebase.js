import { initializeApp } from "firebase/app";
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCP142tLZIn4TTyf5Bmjv6sHV4bnv_9plU",
    authDomain: "real-time-chat-8c3e3.firebaseapp.com",
    projectId: "real-time-chat-8c3e3",
    storageBucket: "real-time-chat-8c3e3.appspot.com",
    messagingSenderId: "785242278862",
    appId: "1:785242278862:web:d7c46e20969521f978b99f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);