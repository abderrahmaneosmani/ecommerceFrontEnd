// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDxCW_O4OuAJTo4b0CKn9ZoYtXXCJ_2PpI",
  authDomain: "portfolio-9a3ea.firebaseapp.com",
  projectId: "portfolio-9a3ea",
  storageBucket: "portfolio-9a3ea.appspot.com",
  messagingSenderId: "541567822675",
  appId: "1:541567822675:web:e95b9479107a5f29160fa6",
  measurementId: "G-KY7Q7FRZ1N",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const auth = getAuth(app);
