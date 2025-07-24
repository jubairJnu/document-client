"use client";

import { useParams, useRouter } from "next/navigation";

import { ArrowLeft, Calendar, Clock, Trash2, Bot, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import {
  useDeleteArticle,
  useSingleArticles,
  useSummarizeArticle,
} from "@/app/hooks/article-hook";
import { LoadingSpinner } from "@/component/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import Swal from "sweetalert2";

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const { data: article, isLoading, error } = useSingleArticles(articleId);
  const deleteArticle = useDeleteArticle();
  const summarizeArticle = useSummarizeArticle();

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteArticle.mutateAsync(article.id);
          toast.success("Article deleted successfully");
        }
      });
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  const handleSummarize = async () => {
    try {
      await summarizeArticle.mutateAsync(articleId);
      toast.success("Article summarized successfully");
    } catch (error) {
      toast.error("Failed to summarize article");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Article not found or failed to load.</p>
        <Link href="/dashboard">
          <button className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto mt-10 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <button className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </Link>

        <div className="flex space-x-5">
          <button
          className="flex items-center cursor-pointer"
            onClick={handleSummarize}
            disabled={summarizeArticle.isPending}
          >
            {summarizeArticle.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                {article.summary ? "Regenerate Summary" : "Generate AI Summary"}
              </>
            )}
          </button>

          <button className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2
              onClick={() => handleDelete(article.id)}
              className="h-4 w-4"
            />
          </button>
        </div>
      </div>

      {/* Article Content */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900">
            {article?.data[0]?.title}
          </CardTitle>

          <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>
                Created{" "}
                {formatDistanceToNow(new Date(article?.data[0]?.createdAt))} ago
              </span>
            </div>
            {article.updatedAt !== article.createdAt && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>
                  Updated{" "}
                  {formatDistanceToNow(new Date(article?.data[0]?.updatedAt))}{" "}
                  ago
                </span>
              </div>
            )}
          </div>

          {article?.data[0]?.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {article?.data[0]?.tags.map((tag: string) => (
                <div key={tag}>{tag}</div>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* AI Summary */}
          {article?.data[0]?.summary && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <Bot className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">AI Summary</span>
              </div>
              <p className="text-blue-700 leading-relaxed">{article.summary}</p>
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article?.data[0]?.body}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
