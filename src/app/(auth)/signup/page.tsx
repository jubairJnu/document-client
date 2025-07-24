"use client";

import { useState, useEffect } from "react";


import { useRouter } from "next/navigation";
import { AuthForm } from "@/component/auth/AuthForm";
import { LoadingSpinner } from "@/component/ui/spinner";
import { useAuth } from "@/app/hooks/auth-hook";

export default function SignupPage() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const { isAuthenticated, isLoggingIn, isSigningUp } = useAuth();
  const isLoading = isLoggingIn || isSigningUp;
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
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
