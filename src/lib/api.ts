/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Article,
  CreateArticleRequest,
  LoginRequest,
  SignupRequest,
} from "@/app/types";
import axiosInstance from "./axios.instance";

export const authApi = {
  login: async (payload: LoginRequest) => {
    const { data } = await axiosInstance.post("/auth/login", payload);
    return data;
  },

  signup: async (payload: SignupRequest) => {
    const { data } = await axiosInstance.post("/auth/signup", payload);
    return data;
  },
};

export const articlesApi = {
  getuserArticles: async (query: Record<string, any>) => {
    const { data } = await axiosInstance.get("/articles", {
      params: query,
    });
    return data;
  },
  getuserSingleArticles: async (id: string) => {
    const { data } = await axiosInstance.get(`/articles/${id}`);
    return data;
  },

  createArticles: async (payload: CreateArticleRequest) => {
    const { data } = await axiosInstance.post("/articles", payload);
    return data;
  },

  summerizeArticles: async (id: string) => {
    const { data } = await axiosInstance.post(`/articles/${id}`);
    return data;
  },

  deleteArticles: async (id: string) => {
    const { data } = await axiosInstance.delete(`/articles/${id}`);
    return data;
  },
};
