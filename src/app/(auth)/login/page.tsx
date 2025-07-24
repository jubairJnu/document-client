"use client";

import { useAuth } from "@/app/hooks/auth-hook";
import { AuthForm } from "@/component/auth/AuthForm";
import { LoadingSpinner } from "@/component/ui/spinner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { isAuthenticated, isLoggingIn, isSigningUp } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isLoggingIn || isSigningUp) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthForm
      mode={mode}
      onToggleMode={() => setMode(mode === "login" ? "signup" : "login")}
    />
  );
}
