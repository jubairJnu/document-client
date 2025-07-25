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
      if (data?.data?.accessToken) {
        localStorage.setItem("auth-token", data.data.accessToken);
        queryClient.setQueryData(["auth", "user"], data.user);
        setIsAuthenticated(true);
        router.push("/dashboard");
      } else {
        // Optional: handle unexpected login response
        console.warn("Login succeeded but accessToken is missing");
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
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
