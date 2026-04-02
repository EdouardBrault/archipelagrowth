
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n";
import { trackNavigation, trackButtonClick, trackPageView } from "@/utils/gtm";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { t, language, setLanguage, localePath, languages } = useLanguage();

  const NAV_ITEMS = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/about" },
    {
      name: t.nav.services,
      href: "/geo-services",
      dropdown: [
        { name: t.nav.geo, href: "/geo-services" },
        { name: t.nav.googleAds, href: "/google-ads" },
        { name: t.nav.linkedinAds, href: "/linkedin-ads" },
        { name: t.nav.metaAds, href: "/meta-ads" },
        { name: t.nav.seo, href: "/seo-services" },
        { name: t.nav.landingPages, href: "/landing-pages" },
      ],
    },
    { name: t.nav.references, href: "/references" },
    { name: t.nav.blog, href: "/blog" },
  ];

  const SERVICES_LINKS = [
    { name: t.nav.geo + " Services", href: "/geo-services" },
    { name: t.nav.googleAds, href: "/google-ads" },
    { name: t.nav.linkedinAds, href: "/linkedin-ads" },
    { name: t.nav.metaAds, href: "/meta-ads" },
    { name: t.nav.seo, href: "/seo-services" },
    { name: t.nav.landingPages, href: "/landing-pages" },
  ];

  const EXPERTISE_LINKS = [
    { name: t.footer.ourGeoTeam, href: "/about#our-team" },
    { name: t.footer.geoMethodology, href: "/geo-services" },
    { name: t.footer.clientTestimonials, href: "/references" },
  ];

  const LEGAL_LINKS = [
    { name: t.footer.legalNotice, href: "/legal-notice" },
    { name: t.footer.termsOfUse, href: "/terms" },
    { name: t.footer.privacyPolicy, href: "/privacy-policy" },
  ];

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
    trackPageView(location.pathname, document.title);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === localePath(path);

  const handleNavClick = (itemName: string, href: string) => {
    trackNavigation(location.pathname, href, itemName);
  };

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={localePath("/")} className="flex items-center" onClick={() => trackNavigation(location.pathname, '/', 'Logo')}>
              <img src="/lovable-uploads/archipelagrowth-logo.png" alt="ArchipelaGrowth Logo" className="h-6 w-auto" width="120" height="24" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="relative" ref={servicesRef} onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                    <Link to={localePath(item.href)} onClick={() => handleNavClick(item.name, item.href)} className={`text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? "text-[#0043F1]" : "text-gray-700 hover:text-[#0043F1]"}`}>
                      {item.name}
                    </Link>
                    {isServicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-2 w-[600px] z-50">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-6 px-6">
                          {item.dropdown.map((sub) => (
                            <Link key={sub.name} to={localePath(sub.href)} onClick={() => { handleNavClick(sub.name, sub.href); setIsServicesOpen(false); }} className="block px-4 py-4 text-base text-gray-700 hover:text-[#0043F1] transition-colors">
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.name} to={localePath(item.href)} onClick={() => handleNavClick(item.name, item.href)} className={`text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? "text-[#0043F1]" : "text-gray-700 hover:text-[#0043F1]"}`}>
                    {item.name}
                  </Link>
                )
              )}

              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#0043F1] transition-colors">
                  <Globe className="w-4 h-4" />
                  {languages.find(l => l.code === language)?.flag}
                  <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-40 z-50">
                    {languages.map((lang) => (
                      <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }} className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-inter transition-colors ${language === lang.code ? "text-[#0043F1] bg-blue-50 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal px-8 rounded-lg font-inter" onClick={() => trackButtonClick('Contact Us', 'Header', '/contact')}>
                <Link to={localePath("/contact") + "#contact-form"}>{t.nav.contactUs}</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <div className="relative" ref={langRef}>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 text-gray-700">
                  <Globe className="w-4 h-4" />
                  {languages.find(l => l.code === language)?.flag}
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-40 z-50">
                    {languages.map((lang) => (
                      <button key={lang.code} onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }} className={`flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm ${language === lang.code ? "text-[#0043F1] bg-blue-50 font-medium" : "text-gray-700 hover:bg-gray-50"}`}>
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-[#0043F1]">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)} className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive(item.href) ? "text-[#0043F1]" : "text-gray-700 hover:text-[#0043F1]"}`}>
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMobileServicesOpen && (
                        <div className="pl-6 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                          {item.dropdown.map((sub) => (
                            <Link key={sub.name} to={localePath(sub.href)} className={`block px-3 py-2 text-sm transition-colors duration-200 ${isActive(sub.href) ? "text-[#0043F1] font-medium" : "text-gray-500 hover:text-[#0043F1]"}`} onClick={() => { handleNavClick(sub.name, sub.href); setIsMenuOpen(false); setIsMobileServicesOpen(false); }}>
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to={localePath(item.href)} className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive(item.href) ? "text-[#0043F1]" : "text-gray-700 hover:text-[#0043F1]"}`} onClick={() => { handleNavClick(item.name, item.href); setIsMenuOpen(false); }}>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-medium rounded-full" onClick={() => setIsMenuOpen(false)}>
                  <Link to={localePath("/contact") + "#contact-form"}>{t.nav.contactUs}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16 overflow-x-hidden">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0a0a14] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img src="/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png" alt="ArchipelaGrowth Logo" className="h-10 w-auto mb-5" width="40" height="40" loading="lazy" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">{t.footer.description}</p>
              <Link to={localePath("/contact") + "#contact-form"} onClick={() => trackNavigation(location.pathname, '/contact#contact-form', 'Footer - Contact Us')} className="inline-flex items-center gap-2 bg-[#0043F1] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0043F1]/90 transition-colors">
                {t.nav.contactUs}
              </Link>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">{t.footer.ourServices}</h3>
              <ul className="space-y-3">
                {SERVICES_LINKS.map((item) => (
                  <li key={item.name}><Link to={localePath(item.href)} onClick={() => trackNavigation(location.pathname, item.href, `Footer - ${item.name}`)} className="text-gray-400 text-sm hover:text-white transition-colors duration-200">{item.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">{t.footer.resources}</h3>
              <ul className="space-y-3">
                {EXPERTISE_LINKS.map((item) => (
                  <li key={item.name}><Link to={localePath(item.href)} onClick={() => trackNavigation(location.pathname, item.href, `Footer - ${item.name}`)} className="text-gray-400 text-sm hover:text-white transition-colors duration-200">{item.name}</Link></li>
                ))}
                <li><Link to={localePath("/blog")} onClick={() => trackNavigation(location.pathname, '/blog', 'Footer - Blog')} className="text-gray-400 text-sm hover:text-white transition-colors duration-200">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">{t.footer.contact}</h3>
              <ul className="space-y-3">
                <li><Link to={localePath("/about")} onClick={() => trackNavigation(location.pathname, '/about', 'Footer - About')} className="text-gray-400 text-sm hover:text-white transition-colors duration-200">{t.footer.aboutUs}</Link></li>
                <li><Link to={localePath("/contact") + "#contact-form"} onClick={() => trackNavigation(location.pathname, '/contact', 'Footer - Form')} className="text-gray-400 text-sm hover:text-white transition-colors duration-200">{t.footer.contactForm}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">{t.footer.legal}</h3>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.name}><Link to={localePath(item.href)} onClick={() => trackNavigation(location.pathname, item.href, `Footer - ${item.name}`)} className="text-gray-400 text-sm hover:text-white transition-colors duration-200">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
