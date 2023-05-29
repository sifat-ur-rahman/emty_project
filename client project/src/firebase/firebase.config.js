// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzHU65jK3f9AEFX188Lw4wgbdNA_57o-Y",
  authDomain: "genius-car-e8ee9.firebaseapp.com",
  projectId: "genius-car-e8ee9",
  storageBucket: "genius-car-e8ee9.appspot.com",
  messagingSenderId: "620655252769",
  appId: "1:620655252769:web:953cd0c51bbb67aa8c9a60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app