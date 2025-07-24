// // libauth.ts

// import {
//   Article,
//   CreateArticleRequest,
//   LoginRequest,
//   SignupRequest,
// } from "@/app/types";
// import axios from "axios";
// import { baseApi } from "./baseApi";

// export const authApi = {
//   login: async (payload: LoginRequest) => {
//     const { data } = await axios.post(`${baseApi}/auth/login`, payload);
//     return data;
//   },

//   signup: async (payload: SignupRequest) => {
//     const { data } = await axios.post(`${baseApi}/auth/signup`, payload);
//     return data;
//   },
// };
// export const articlesApi = {
//   getuserArticles: async (payload: {
//     token: string;
//     query: Record<string, any>;
//   }) => {
//     const { data } = await axios.get(`${baseApi}/articles`, {
//       headers: {
//         Authorization: payload.token,
//       },
//       params: payload.query,
//     });

//     return data;
//   },

//   createArticles: async (payload: CreateArticleRequest) => {
//     const { data } = await axios.post(`${baseApi}/articles`, payload);
//     return data;
//   },
//   summerizeArticles: async (id: string, ) => {
//     const { data } = await axios.post(`${baseApi}/articles/${id}`,{

//     });
//     return data;
//   },
//   deleteArticles: async (payload: Article) => {
//     const { data } = await axios.delete(`${baseApi}/auth/signup`, payload);
//     return data;
//   },
// };

// lib/libauth.ts
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
