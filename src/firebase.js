// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvbuUknMtPVJ6_DJ50rIOV_Y_acMqC9UQ",
  authDomain: "hspantryapp-a2090.firebaseapp.com",
  projectId: "hspantryapp-a2090",
  storageBucket: "hspantryapp-a2090.appspot.com",
  messagingSenderId: "93712348974",
  appId: "1:93712348974:web:5f00727b6dab7d8f946cbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
  prompt : "select_account "
});

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, provider };