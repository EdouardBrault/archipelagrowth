import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminDashboardHeaderProps {
  articlesCount: number;
}

const AdminDashboardHeader = ({ articlesCount }: AdminDashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-jakarta text-2xl font-bold text-[#010D3E]">Articles</h1>
        <p className="text-sm text-[#010D3E]/40 font-inter mt-0.5">
          {articlesCount} article{articlesCount > 1 ? 's' : ''}
        </p>
      </div>
      <Button
        asChild
        size="sm"
        className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter text-xs gap-1.5"
      >
        <Link to="/admin-dashboard/create-article">
          <Plus className="h-3.5 w-3.5" />
          Nouvel article
        </Link>
      </Button>
    </div>
  );
};

export default AdminDashboardHeader;
