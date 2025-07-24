"use client";

import { useState } from "react";

import {
  Eye,
  Trash2,
  Bot,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  Loader2,
} from "lucide-react";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import { Article } from "@/app/types";
import {
  useDeleteArticle,
  useSummarizeArticle,
} from "@/app/hooks/article-hook";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
      await summarizeArticle.mutateAsync(article.id);
      setShowSummary(true);
      toast.success("Article summarized successfully");
    } catch (error) {
      toast.error("Failed to summarize article");
    }
  };

  const truncatedBody =
    article.body.length > 200
      ? article.body.substring(0, 200) + "..."
      : article.body;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {article.title}
          </CardTitle>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/articles/${article.id}`}>
              <button className="h-8 w-8 p-0">
                <Eye className="h-10 w-4" />
              </button>
            </Link>

            <button className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2
                onClick={() => handleDelete(article.id)}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(article.createdAt))} ago</span>
          </div>
          {article.updatedAt !== article.createdAt && (
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>
                Updated {formatDistanceToNow(new Date(article.updatedAt))} ago
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-gray-700 leading-relaxed">
          <div>{isExpanded ? article.body : truncatedBody}</div>

          {article.body.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto mt-2 text-blue-600 flex items-center"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Read more
                </>
              )}
            </button>
          )}
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <div key={tag} className="text-xs">
                {tag}
              </div>
            ))}
          </div>
        )}

        {(article.summary || showSummary) && (
          <>
            <button className="w-full">
              <Bot className="h-4 w-4 mr-2" />
              {showSummary ? "Hide Summary" : "Show AI Summary"}
              {showSummary ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </button>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Bot className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  AI Summary
                </span>
              </div>
              <p className="text-sm text-blue-700 leading-relaxed">
                {article.summary}
              </p>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter>
        <button
          onClick={handleSummarize}
          disabled={summarizeArticle.isPending}
          className="w-full"
        >
          {summarizeArticle.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Summary...
            </>
          ) : (
            <>
              {article.summary ? "Regenerate Summary" : "Generate AI Summary"}
            </>
          )}
        </button>
      </CardFooter>
    </Card>
  );
}
