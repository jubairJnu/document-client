"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";
import { CreateArticleRequest } from "@/app/types";
import { useCreateArticle } from "@/app/hooks/article-hook";
import { ArticleForm } from "@/component/articles/ArticleForm";

export default function NewArticlePage() {
  const router = useRouter();
  const createArticle = useCreateArticle();

  const handleSubmit = async (data: CreateArticleRequest) => {
    try {
      await createArticle.mutateAsync(data);
      toast.success("Article created successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to create article");
      throw error;
    }
  };

  return (
    <div className="space-y-6 bg-amber-50 text-black p-10">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <button className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Form */}
      <ArticleForm
        onSubmit={handleSubmit}
        isLoading={createArticle.isPending}
        submitlabel="Create Article"
      />
    </div>
  );
}
