// Firebase
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuEM2mbLZVt0wqXANVWjRSQrvHLH3GwtY",
  authDomain: "gym-training-93f26.firebaseapp.com",
  projectId: "gym-training-93f26",
  storageBucket: "gym-training-93f26.firebasestorage.app",
  messagingSenderId: "614907934619",
  appId: "1:614907934619:web:12a3f11df90b2dd554133e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
