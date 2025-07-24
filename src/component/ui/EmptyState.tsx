import { FileText, Search, Plus } from "lucide-react";

import Link from "next/link";

interface EmptyStateProps {
  icon?: "articles" | "search";
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  icon = "articles",
  title,
  description,
  action,
}: EmptyStateProps) {
  const IconComponent = icon === "search" ? Search : FileText;

  return (
    <div className="text-center py-12">
      <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
        <IconComponent className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Link href={action.href}>
          <button>
            <Plus className="h-4 w-4 mr-2" />
            {action.label}
          </button>
        </Link>
      )}
    </div>
  );
}
