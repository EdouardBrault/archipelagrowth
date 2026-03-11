
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NAVIGATION_ITEMS, LEGAL_LINKS, SERVICES_LINKS, EXPERTISE_LINKS } from "@/constants/navigation";
import { CONTACT_INFO } from "@/constants/contact";
import { trackNavigation, trackButtonClick, trackPageView } from "@/utils/gtm";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS: Array<{name: string; href: string; dropdown?: Array<{name: string; href: string}>}> = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Services", 
    href: "/geo-services",
    dropdown: [
      { name: "GEO", href: "/geo-services" },
      { name: "Google Ads", href: "/google-ads" },
      { name: "LinkedIn Ads", href: "/linkedin-ads" },
      { name: "Meta Ads", href: "/meta-ads" },
      { name: "SEO", href: "/seo-services" },
      { name: "Landing Pages", href: "/landing-pages" },
    ]
  },
  { name: "References", href: "/references" },
  { name: "Blog", href: "/blog" },
];

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (itemName: string, href: string) => {
    trackNavigation(location.pathname, href, itemName);
  };

  const handleLogoClick = () => {
    trackNavigation(location.pathname, '/', 'Logo');
  };

  const handleLinkedinClick = () => {
    trackButtonClick('LinkedIn Footer', 'Footer', 'https://www.linkedin.com/company/archipelagrowth');
  };

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={handleLogoClick}>
              <img 
                src="/lovable-uploads/archipel-logo-blue.png" 
                alt="ArchipelaGrowth Logo" 
                className="h-6 w-auto"
                width="120"
                height="24"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                item.dropdown ? (
                  <div 
                    key={item.name} 
                    className="relative" 
                    ref={servicesRef}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                   <Link
                      to={item.href}
                      onClick={() => handleNavClick(item.name, item.href)}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? "text-[#0043F1]"
                          : "text-gray-700 hover:text-[#0043F1]"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {isServicesOpen && (
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-2 w-[600px] z-50"
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-6 px-6">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => {
                                handleNavClick(sub.name, sub.href);
                                setIsServicesOpen(false);
                              }}
                              className="block px-4 py-4 text-base text-gray-700 hover:text-[#0043F1] transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.name, item.href)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-[#0043F1]"
                        : "text-gray-700 hover:text-[#0043F1]"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Button 
                asChild 
                className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal px-8 rounded-lg font-inter"
                onClick={() => trackButtonClick('Contact Us', 'Header', '/contact')}
              >
                <Link to="/contact#contact-form">Contact Us</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#0043F1]"
              >
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
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? "text-[#0043F1]"
                            : "text-gray-700 hover:text-[#0043F1]"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMobileServicesOpen && (
                        <div className="pl-6 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                                isActive(sub.href)
                                  ? "text-[#0043F1] font-medium"
                                  : "text-gray-500 hover:text-[#0043F1]"
                              }`}
                              onClick={() => {
                                handleNavClick(sub.name, sub.href);
                                setIsMenuOpen(false);
                                setIsMobileServicesOpen(false);
                              }}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? "text-[#0043F1]"
                          : "text-gray-700 hover:text-[#0043F1]"
                      }`}
                      onClick={() => {
                        handleNavClick(item.name, item.href);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-3 py-2">
                <Button 
                  asChild 
                  className="w-full bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-medium rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/contact#contact-form">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16 overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a14] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {/* Logo + description */}
            <div className="col-span-1 md:col-span-2">
              <img 
                src="/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png" 
                alt="ArchipelaGrowth Logo" 
                className="h-10 w-auto mb-5"
                width="40"
                height="40"
                loading="lazy"
              />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
                The #1 GEO agency in the US. Specialized in AI visibility on ChatGPT, Google AI Overview, Gemini, Copilot, and Perplexity.
              </p>
              <Link 
                to="/contact#contact-form"
                onClick={() => trackNavigation(location.pathname, '/contact#contact-form', 'Footer - Contact Us')}
                className="inline-flex items-center gap-2 bg-[#0043F1] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0043F1]/90 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Our Services */}
            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">Our Services</h3>
              <ul className="space-y-3">
                {SERVICES_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => trackNavigation(location.pathname, item.href, `Footer - ${item.name}`)}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">Resources</h3>
              <ul className="space-y-3">
                {EXPERTISE_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => trackNavigation(location.pathname, item.href, `Footer - ${item.name}`)}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/blog"
                    onClick={() => trackNavigation(location.pathname, '/blog', 'Footer - Blog')}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    onClick={() => trackNavigation(location.pathname, '/about', 'Footer - About')}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact#contact-form"
                    onClick={() => trackNavigation(location.pathname, '/contact', 'Footer - Form')}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    Contact Form
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-5 text-sm">Legal</h3>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => trackNavigation(location.pathname, item.href, `Footer - ${item.name}`)}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
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
