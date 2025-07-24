// libauth.ts

import { LoginRequest, SignupRequest } from "@/app/types";
import axios from "axios";
import { baseApi } from "./baseApi";

export const authApi = {
  login: async (payload: LoginRequest) => {
    const { data } = await axios.post(`${baseApi}/auth/login`, payload);
    return data;
  },
  // getCurrentUser: async (payload: LoginRequest) => {
  //   const { data } = await axios.post(`${baseApi}/auth/login`, payload);
  //   return data;
  // },

  signup: async (payload: SignupRequest) => {
    const { data } = await axios.post(`${baseApi}/auth/signup`, payload);
    return data;
  },
};
