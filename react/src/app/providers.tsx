"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import ModeProvider from "@/contexts/ModeContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ModeProvider>{children}</ModeProvider>
    </AuthProvider>
  );
}
