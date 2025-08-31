import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-Z3ZCfW1JmNryxBvyYVRrYgOSV93PM5Q",
authDomain: "ecommerseproject-4448a.firebaseapp.com",
projectId: "ecommerseproject-4448a",
storageBucket: "ecommerseproject-4448a.appspot.com",
messagingSenderId: "393255872236",
appId: "1:393255872236:web:92c53a4764b26c4dc227c9"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
