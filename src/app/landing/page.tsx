"use client";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function LandingPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  function handleSignIn() {
    signInWithGoogle().then(() => router.push("/"));
  }

  return (
    <div>
      <h1>Welcome to the landing page</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}
