"use client";

import { useEffect, useState, createContext, useRef, useContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { app, provider, db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export const AuthContext = createContext<{
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  signInWithGoogle: () => Promise<any>;
  signOutUser: () => void;
}>({
  user: null,
  setUser: () => {},
  signInWithGoogle: async () => {},
  signOutUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  async function signOutUser() {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function signInWithGoogle() {
    // Google auth provider
    const auth = getAuth(app);
    return signInWithPopup(auth, provider)
      // .then((result) => {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      //   // The signed-in user info.
      //   setUser(result.user);
      //   // IdP data available using getAdditionalUserInfo(result)
      //   // ...
      // })
      // .catch((error) => {
      //   console.log(error);
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // The email of the user's account used.
      //   const email = error.customData.email;
      //   // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error);
      //   // ...
      // });
  }

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      // console.log(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, signInWithGoogle, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
