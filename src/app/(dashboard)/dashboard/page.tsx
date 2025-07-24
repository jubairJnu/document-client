"use client";
import { useArticles } from "@/app/hooks/article-hook";
import { Article } from "@/app/types";
import { ArticleCard } from "@/component/articles/article-card";
import { EmptyState } from "@/component/ui/EmptyState";
import { LoadingSpinner } from "@/component/ui/spinner";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  const { data: articles = [], isLoading, error } = useArticles();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 w-full text-black">
      <div className="flex space-x-3 justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-700">
            Welcome to your dashboard! Here you can manage your articles, search
            for content, and create new articles.
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <Link className="flex items-center  " href="/search">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Link>
          <Link href="/articles/new">
            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </button>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Articles
          </h2>
          {articles.length > 0 && (
            <Link href="/search">
              <button>View All</button>
            </Link>
          )}
        </div>

        {articles?.data?.length === 0 ? (
          <EmptyState
            title="No articles yet"
            description="Start creating your first article to build your content library."
            action={{
              label: "Create Article",
              href: "/articles/new",
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles?.data?.slice(0, 4).map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
