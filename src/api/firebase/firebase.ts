// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCawcocp6fC6Bn_bEMjfRHChW86WPy_040",
  authDomain: "albumcontroler-fef17.firebaseapp.com",
  projectId: "albumcontroler-fef17",
  storageBucket: "albumcontroler-fef17.appspot.com",
  messagingSenderId: "367360549092",
  appId: "1:367360549092:web:992c3627e1f19eacb28cf1",
  measurementId: "G-537S3HGFJY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
