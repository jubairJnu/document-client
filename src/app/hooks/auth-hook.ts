"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { LoginRequest, SignupRequest } from "../types";
import { authApi } from "@/lib/api";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  //   const { data: user, isLoading } = useQuery({
  //     queryKey: ["auth", "user"],
  //     queryFn: () => authApi.getCurrentUser(),
  //     staleTime: Infinity,
  //   });
  const token = localStorage.getItem("auth-token");

  console.log(token, "token");

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      localStorage.setItem("auth-token", data.accessToken);
      router.push("/dashboard");
    },
  });

  const signupMutation = useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      router.push("/dashboard");
    },
  });

  return {
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    isAuthenticated: !!token,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
};
