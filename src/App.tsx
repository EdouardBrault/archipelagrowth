
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Index from "./pages/Index";
import ArchipelService from "./pages/ArchipelService";
import ArchipelContact from "./pages/ArchipelContact";
import ArchipelAPropos from "./pages/ArchipelAPropos";
import ArchipelNosReferences from "./pages/ArchipelNosReferences";
import ArchipelReferenceDetail from "./pages/ArchipelReferenceDetail";
import ArchipelBlog from "./pages/ArchipelBlog";
import ArchipelArticle from "./pages/ArchipelArticle";
import ArchipelArticleDetail from "./pages/ArchipelArticleDetail";
import ArchipelServiceGeneric from "./pages/ArchipelServiceGeneric";
import SimulateurAuditGeo from "./pages/SimulateurAuditGeo";
import SimulateurAuditGeoEn from "./pages/SimulateurAuditGeoEn";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGU from "./pages/CGU";
import AgenceMarketingDigitalFrance from "./pages/AgenceMarketingDigitalFrance";
import AdminAuth from "./components/Admin/AdminAuth";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminPipeline from "./pages/AdminPipeline";
import CreateArticleForm from "./components/CreateArticle/CreateArticleForm";
import EditArticleForm from "./components/EditArticle/EditArticleForm";

const queryClient = new QueryClient();

const LegacyEditArticleRedirect = () => {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={id ? `/admin-dashboard/edit-article/${id}` : "/admin-dashboard"} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        {/* New English routes */}
        <Route path="/geo-services" element={<ArchipelService />} />
        <Route path="/google-ads" element={<ArchipelServiceGeneric serviceKey="google-ads" />} />
        <Route path="/linkedin-ads" element={<ArchipelServiceGeneric serviceKey="linkedin-ads" />} />
        <Route path="/meta-ads" element={<ArchipelServiceGeneric serviceKey="meta-ads" />} />
        <Route path="/seo-services" element={<ArchipelServiceGeneric serviceKey="seo" />} />
        <Route path="/landing-pages" element={<ArchipelServiceGeneric serviceKey="landing-page" />} />
        <Route path="/geo-audit" element={<SimulateurAuditGeo />} />
        <Route path="/geo-audit-en" element={<SimulateurAuditGeoEn />} />
        <Route path="/contact" element={<ArchipelContact />} />
        <Route path="/about" element={<ArchipelAPropos />} />
        <Route path="/references" element={<ArchipelNosReferences />} />
        <Route path="/blog" element={<ArchipelBlog />} />
        <Route path="/blog/:slug" element={<ArchipelArticleDetail />} />
        <Route path="/legal-notice" element={<MentionsLegales />} />
        <Route path="/privacy-policy" element={<PolitiqueConfidentialite />} />
        <Route path="/terms" element={<CGU />} />
        {/* Admin routes */}
        <Route path="/admin-login" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/admin-dashboard" element={<AdminAuth><AdminDashboard /></AdminAuth>} />
        <Route path="/admin-dashboard/create-article" element={<AdminAuth><CreateArticleForm /></AdminAuth>} />
        <Route path="/admin-dashboard/edit-article/:id" element={<AdminAuth><EditArticleForm /></AdminAuth>} />
        <Route path="/admin-pipeline" element={<AdminAuth><AdminPipeline /></AdminAuth>} />
        {/* Reference detail */}
        <Route path="/:clientSlug" element={<ArchipelReferenceDetail />} />
        {/* Old French route redirects */}
        <Route path="/agence-geo-archipel" element={<Navigate to="/geo-services" replace />} />
        <Route path="/agence-google-ads-archipel" element={<Navigate to="/google-ads" replace />} />
        <Route path="/agence-linkedin-ads-archipel" element={<Navigate to="/linkedin-ads" replace />} />
        <Route path="/agence-meta-ads-archipel" element={<Navigate to="/meta-ads" replace />} />
        <Route path="/agence-seo-archipel" element={<Navigate to="/seo-services" replace />} />
        <Route path="/agence-landing-page" element={<Navigate to="/landing-pages" replace />} />
        <Route path="/simulateur-audit-GEO" element={<Navigate to="/geo-audit" replace />} />
        <Route path="/simulateur-audit-geo-en" element={<Navigate to="/geo-audit-en" replace />} />
        <Route path="/qui-sommes-nous" element={<Navigate to="/about" replace />} />
        <Route path="/archipel-nos-references" element={<Navigate to="/references" replace />} />
        <Route path="/mentions-legales" element={<Navigate to="/legal-notice" replace />} />
        <Route path="/politique-confidentialite" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/cgu" element={<Navigate to="/terms" replace />} />
        <Route path="/archipel-homepage" element={<Navigate to="/" replace />} />
        <Route path="/archipel-blog" element={<Navigate to="/blog" replace />} />
        <Route path="/archipel-contact" element={<Navigate to="/contact" replace />} />
        <Route path="/archipel-a-propos" element={<Navigate to="/about" replace />} />
        <Route path="/agencegeo" element={<Navigate to="/geo-services" replace />} />
        <Route path="/services-geo" element={<Navigate to="/geo-services" replace />} />
        <Route path="/masterclass" element={<Navigate to="/" replace />} />
        <Route path="/archipel-login" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/archipel-dashboard" element={<Navigate to="/admin-dashboard" replace />} />
        <Route path="/archipel-dashboard/create-article" element={<Navigate to="/admin-dashboard/create-article" replace />} />
        <Route path="/archipel-dashboard/edit-article/:id" element={<LegacyEditArticleRedirect />} />
        <Route path="/agence-marketing-digital-france" element={<Navigate to="/" replace />} />
        <Route path="/archipel-articles" element={<Navigate to="/blog" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
