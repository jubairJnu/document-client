"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LoginRequest, SignupRequest } from "../types";
import { authApi } from "@/lib/api";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Only runs on the client
    const token = localStorage.getItem("auth-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      if (data.data.accessToken) {
        localStorage.setItem("auth-token", data.data.accessToken);
      }
      setIsAuthenticated(true);
      router.push("/dashboard");
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      localStorage.setItem("auth-token", data.accessToken);
      setIsAuthenticated(true);
      router.push("/dashboard");
    },
  });

  return {
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    isAuthenticated,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
};
