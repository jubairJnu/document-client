/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articlesApi } from "@/lib/api";
import { CreateArticleRequest, SearchFilters } from "../types";

export const useArticles = (filters?: SearchFilters) => {
  return useQuery({
    queryKey: ["articles", filters],
    queryFn: () => articlesApi.getuserArticles(filters as Record<string, any>),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export const useSingleArticles = (id: string) => {
  return useQuery({
    queryKey: ["single-article", id], // unique per article ID
    queryFn: () => articlesApi.getuserSingleArticles(id), // must return a Promise
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateArticleRequest) =>
      articlesApi.createArticles(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articlesApi.deleteArticles(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useSummarizeArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articlesApi.summerizeArticles(id),
    onSuccess: (summary, id) => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      queryClient.setQueryData(["articles", id], (old: any) =>
        old ? { ...old, summary } : old
      );
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
