// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgo7FqsKQoJKaA24w6LkfUh12wTqfzGvU",
  authDomain: "motus-game.firebaseapp.com",
  projectId: "motus-game",
  storageBucket: "motus-game.appspot.com",
  messagingSenderId: "719536450296",
  appId: "1:719536450296:web:5db482d8a0df6d99d5e90d",
  measurementId: "G-2WF5Q6YEKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);