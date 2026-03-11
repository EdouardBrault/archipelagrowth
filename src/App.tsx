
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
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
import CreateArticleForm from "./components/CreateArticle/CreateArticleForm";
import EditArticleForm from "./components/EditArticle/EditArticleForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agence-geo-archipel" element={<ArchipelService />} />
        <Route path="/agence-google-ads-archipel" element={<ArchipelServiceGeneric serviceKey="google-ads" />} />
        <Route path="/agence-linkedin-ads-archipel" element={<ArchipelServiceGeneric serviceKey="linkedin-ads" />} />
        <Route path="/agence-meta-ads-archipel" element={<ArchipelServiceGeneric serviceKey="meta-ads" />} />
        <Route path="/agence-seo-archipel" element={<ArchipelServiceGeneric serviceKey="seo" />} />
        <Route path="/agence-landing-page" element={<ArchipelServiceGeneric serviceKey="landing-page" />} />
        <Route path="/simulateur-audit-GEO" element={<SimulateurAuditGeo />} />
        <Route path="/simulateur-audit-geo-en" element={<SimulateurAuditGeoEn />} />
        <Route path="/agence-marketing-digital-france" element={<AgenceMarketingDigitalFrance />} />
        <Route path="/contact" element={<ArchipelContact />} />
        <Route path="/qui-sommes-nous" element={<ArchipelAPropos />} />
        <Route path="/archipel-nos-references" element={<ArchipelNosReferences />} />
        <Route path="/:clientSlug" element={<ArchipelReferenceDetail />} />
        <Route path="/blog" element={<ArchipelBlog />} />
        <Route path="/archipel-articles" element={<ArchipelArticle />} />
        <Route path="/blog/:slug" element={<ArchipelArticleDetail />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/archipel-login" element={<Navigate to="/archipel-dashboard" replace />} />
        <Route path="/archipel-dashboard" element={<AdminAuth><AdminDashboard /></AdminAuth>} />
        <Route path="/archipel-dashboard/create-article" element={<AdminAuth><CreateArticleForm /></AdminAuth>} />
        <Route path="/archipel-dashboard/edit-article/:id" element={<AdminAuth><EditArticleForm /></AdminAuth>} />
        {/* Old site redirections */}
        <Route path="/archipel-homepage" element={<Navigate to="/" replace />} />
        <Route path="/archipel-blog" element={<Navigate to="/blog" replace />} />
        <Route path="/archipel-contact" element={<Navigate to="/contact" replace />} />
        <Route path="/archipel-a-propos" element={<Navigate to="/qui-sommes-nous" replace />} />
        <Route path="/agencegeo" element={<Navigate to="/agence-geo-archipel" replace />} />
        <Route path="/services-geo" element={<Navigate to="/agence-geo-archipel" replace />} />
        <Route path="/masterclass" element={<Navigate to="/" replace />} />
        <Route path="/etude-chatgpt-vs-google" element={<Navigate to="/" replace />} />
        <Route path="/simulateur-chatgpt" element={<Navigate to="/" replace />} />
        <Route path="/references-wikipedia" element={<Navigate to="/" replace />} />
        <Route path="/notre-equipe-geo" element={<Navigate to="/qui-sommes-nous#notre-equipe" replace />} />
        <Route path="/methodologie-agence-geo" element={<Navigate to="/agence-geo-archipel" replace />} />
        <Route path="/temoignages-clients-geo" element={<Navigate to="/archipel-nos-references" replace />} />
        <Route path="/faq-geo" element={<Navigate to="/agence-geo-archipel" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
