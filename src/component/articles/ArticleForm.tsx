/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";

import { useState } from "react";
import { CreateArticleRequest } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/Input";
import { Loader2, Plus, X } from "lucide-react";

interface ArticleFormProps {
  onSubmit: (data: CreateArticleRequest) => Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<CreateArticleRequest>;
  submitlabel?: string;
}

type TArticleFormData = {
  title: string;
  body: string;
  tags: string[];
};

export function ArticleForm({
  onSubmit,
  isLoading,
  initialData,
  submitlabel = "Create Article",
}: ArticleFormProps) {
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm();

  const tags = watch("tags") || [];
  const bodyLength = watch("body")?.length || 0;
  const titleLength = watch("title")?.length || 0;

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 10) {
      setValue("tags", [...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {initialData ? "Edit Article" : "Create New Article"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="title">
              Article Title
            </label>
            <Input
              id="title"
              placeholder="Enter a compelling title for your article..."
              {...register("title", {
                required: "Title is required",
              })}
              className={errors.title ? "border-red-500" : ""}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{errors.title?.message as string}</span>
              <span>{titleLength}/200</span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-2">
            <label className="font-semibold" htmlFor="body">
              Article Content
            </label>
            <textarea
              id="body"
              placeholder="Write your article content here..."
              rows={12}
              {...register("body", {
                required: "Content is required",
                maxLength: {
                  value: 10000,
                  message: "Content cannot exceed 10,000 characters",
                },
              })}
              className="w-full border border-slate-300 rounded-2xl"
            />
            <div className="flex justify-between text-xs text-red-500">
              <span>{errors.body?.message as string}</span>
              <span>{bodyLength}/10000</span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <label className="font-semibold">Tags</label>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                maxLength={50}
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!tagInput.trim() || tags.length >= 10}
                className="px-3"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <div key={tag} className="px-2 py-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-500">
              {tags.length}/10 tags • Press Enter or click + to add tags
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 bg-black text-white rounded-md "
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitlabel}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
