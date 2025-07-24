"use client";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
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
    </div>
  );
};

export default DashboardPage;
