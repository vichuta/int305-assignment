// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoX-ni4vp-MfMRr3KWBfnnrPhyPt7msYQ",
  authDomain: "int305fb106.firebaseapp.com",
  projectId: "int305fb106",
  storageBucket: "int305fb106.appspot.com",
  messagingSenderId: "149014982304",
  appId: "1:149014982304:web:d7578104e2eeea10a6a3c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore()
export default db

