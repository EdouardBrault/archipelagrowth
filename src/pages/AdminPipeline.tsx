import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play, RefreshCw, FileText, Globe, Search, CheckCircle, XCircle } from "lucide-react";

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  status: string | null;
  word_count: number | null;
  google_indexed: boolean | null;
  bing_indexed: boolean | null;
  published_at: string | null;
  created_at: string | null;
}

interface PipelineStats {
  total: number;
  publishedToday: number;
  googleIndexed: number;
  bingIndexed: number;
}

export default function AdminPipeline() {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [stats, setStats] = useState<PipelineStats>({ total: 0, publishedToday: 0, googleIndexed: 0, bingIndexed: 0 });
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<any>(null);
  const { toast } = useToast();

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, slug, status, word_count, google_indexed, bing_indexed, published_at, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error(error);
      toast({ title: "Error loading articles", variant: "destructive" });
    } else {
      setArticles(data || []);
      const today = new Date().toISOString().slice(0, 10);
      setStats({
        total: data?.length || 0,
        publishedToday: data?.filter(a => a.published_at?.startsWith(today)).length || 0,
        googleIndexed: data?.filter(a => a.google_indexed).length || 0,
        bingIndexed: data?.filter(a => a.bing_indexed).length || 0,
      });
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  const runPipeline = async () => {
    setRunning(true);
    setPipelineResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("run-daily-pipeline", {
        body: { target_count: 15 },
      });
      if (error) throw error;
      setPipelineResult(data);
      toast({ title: "Pipeline complete!", description: `${data.articles_generated} articles generated` });
      fetchArticles();
    } catch (err: any) {
      toast({ title: "Pipeline failed", description: err.message, variant: "destructive" });
    } finally {
      setRunning(false);
    }
  };

  const togglePublish = async (id: string, currentStatus: string | null) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    const publishedAt = newStatus === "published" ? new Date().toISOString() : null;

    const { error } = await supabase
      .from("articles")
      .update({ status: newStatus, published_at: publishedAt })
      .eq("id", id);

    if (error) {
      toast({ title: "Update failed", variant: "destructive" });
    } else {
      setArticles(prev => prev.map(a => a.id === id ? { ...a, status: newStatus, published_at: publishedAt } : a));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">GEO Content Pipeline</h1>
          <p className="text-muted-foreground mt-1">Automated article generation & indexing</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchArticles} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={runPipeline} disabled={running} className="bg-primary text-primary-foreground">
            {running ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            {running ? "Running Pipeline..." : "Run Pipeline Now"}
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Articles</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{stats.total}</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Published Today</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /><span className="text-2xl font-bold">{stats.publishedToday}</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Google Indexed</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Globe className="w-5 h-5 text-blue-500" /><span className="text-2xl font-bold">{stats.googleIndexed}</span></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Bing Indexed</CardTitle></CardHeader>
          <CardContent><div className="flex items-center gap-2"><Search className="w-5 h-5 text-orange-500" /><span className="text-2xl font-bold">{stats.bingIndexed}</span></div></CardContent>
        </Card>
      </div>

      {/* Pipeline result */}
      {pipelineResult && (
        <Card className="mb-8 border-green-200 bg-green-50/50">
          <CardContent className="pt-4">
            <p className="font-semibold text-green-800">Last Pipeline Run</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
              <div><span className="text-muted-foreground">Articles Generated:</span> <strong>{pipelineResult.articles_generated}</strong></div>
              <div><span className="text-muted-foreground">Errors:</span> <strong>{pipelineResult.generation_errors || 0}</strong></div>
              <div><span className="text-muted-foreground">Google Indexed:</span> <strong>{pipelineResult.indexed_google}</strong></div>
              <div><span className="text-muted-foreground">Bing Indexed:</span> <strong>{pipelineResult.indexed_bing}</strong></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles table */}
      <Card>
        <CardHeader><CardTitle>Recent Articles</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 pr-4">Words</th>
                    <th className="pb-3 pr-4">Google</th>
                    <th className="pb-3 pr-4">Bing</th>
                    <th className="pb-3 pr-4">Published</th>
                    <th className="pb-3">Toggle</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(article => (
                    <tr key={article.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 pr-4 max-w-xs truncate font-medium">{article.title}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={article.status === "published" ? "default" : "secondary"}>
                          {article.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">{article.word_count || "—"}</td>
                      <td className="py-3 pr-4">
                        {article.google_indexed ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                      </td>
                      <td className="py-3 pr-4">
                        {article.bing_indexed ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3">
                        <Switch
                          checked={article.status === "published"}
                          onCheckedChange={() => togglePublish(article.id, article.status)}
                        />
                      </td>
                    </tr>
                  ))}
                  {articles.length === 0 && (
                    <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">No articles yet. Run the pipeline to generate content.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
