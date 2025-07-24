"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/app/hooks/auth-hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/Input";

interface AuthFormProps {
  mode: "login" | "signup";
  onToggleMode: () => void;
}

export function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, signup, isLoggingIn, isSigningUp, loginError, signupError } =
    useAuth();

  const isLogin = mode === "login";

  const isLoading = isLogin ? isLoggingIn : isSigningUp;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      if (isLogin) {
        await login(data as { email: string; password: string });
      } else {
        await signup(
          data as {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
          }
        );
      }
      reset();
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 text-black">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome back" : "Create account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Enter your information to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name">Full Name</label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">
                    {errors.name.message as string}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2 ">
              <label className="font-semibold text-black  " htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email", { required: true })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">Email is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-black  " htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-black" />
                  ) : (
                    <Eye className="h-4 w-4 text-black" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">Password is required</p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className={
                      errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-8 text-white bg-black rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="p-0 ml-1 h-auto font-semibold text-blue-600 hover:text-blue-800"
                onClick={onToggleMode}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                Demo Credentials:
              </p>
              <p className="text-sm text-blue-600">Email: demo11@gmail.com</p>
              <p className="text-sm text-blue-600">Password: demoPass</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
