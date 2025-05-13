// Victor Luiz Koba Batista
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, colection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHopNQWc8fSIpHh5jGof9LcVObwfjUH_w",
  authDomain: "auth-firebase-projeto-au-b0bce.firebaseapp.com",
  projectId: "auth-firebase-projeto-au-b0bce",
  storageBucket: "auth-firebase-projeto-au-b0bce.firebasestorage.app",
  messagingSenderId: "434781508689",
  appId: "1:434781508689:web:5c323ffc5c1bb1582e1470",
  measurementId: "G-LELX22SR1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{ db, getDocs, getFirestore };