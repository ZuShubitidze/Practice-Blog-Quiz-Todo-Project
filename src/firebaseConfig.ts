// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK4gF3E4iOMcjQNIMVveE0znoRaPIcAec",
  authDomain: "todolistapp-204ee.firebaseapp.com",
  projectId: "todolistapp-204ee",
  storageBucket: "todolistapp-204ee.firebasestorage.app",
  messagingSenderId: "110546608842",
  appId: "1:110546608842:web:a6311129130c9648248a33",
  measurementId: "G-SN8DRFKW57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Google Auth Provider

export { auth, app, analytics, googleProvider };
