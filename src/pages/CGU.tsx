
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

const CGU = () => {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Use | ArchipelaGrowth</title>
        <meta name="description" content="Terms of Use for ArchipelaGrowth website." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #D2DCFF 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-[#010D3E] mb-12">Terms of Use</h1>
          <div className="space-y-10">
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">1. Purpose</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>These Terms of Use govern the access and use of the website <strong>archipelagrowth.com</strong>. By accessing this website, you agree to these terms.</p>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">2. Website Access</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>The website is freely accessible to any user with internet access. We strive to maintain continuous access but cannot be held responsible for interruptions due to maintenance, updates, or force majeure.</p>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">3. Intellectual Property</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>All elements of the website (text, images, graphics, logos, videos, software, databases, etc.) are protected by intellectual property laws. Any unauthorized reproduction is prohibited.</p>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">4. Forms and Personal Data</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>The website offers contact forms. By filling them out, you consent to the collection and processing of your personal data in accordance with our <a href="/privacy-policy" className="text-[#0043F1] underline hover:text-[#0043F1]/80 transition-colors">Privacy Policy</a>.</p>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">5. Limitation of Liability</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>ArchipelaGrowth strives to provide accurate information but cannot be held responsible for omissions, inaccuracies, or any direct or indirect damage resulting from the use of this website.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CGU;
