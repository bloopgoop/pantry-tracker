"use client";

import { useEffect, useState, createContext, useRef, useContext } from "react";
import {
  CameraProvider,
  CameraContext,
  useCamera,
} from "@/context/camera-context";
import { AuthContext, AuthProvider, useAuth } from "@/context/auth-context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }
  return (
    <AuthProvider>
      <CameraProvider>{children}</CameraProvider>
    </AuthProvider>
  );
};
export default Providers;

export { CameraContext, useCamera, AuthContext, useAuth };