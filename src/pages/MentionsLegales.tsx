
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

const MentionsLegales = () => {
  return (
    <Layout>
      <Helmet>
        <title>Legal Notice | ArchipelaGrowth</title>
        <meta name="description" content="Legal notice for ArchipelaGrowth – company information, hosting, and intellectual property." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #D2DCFF 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-[#010D3E] mb-12">Legal Notice</h1>
          <div className="space-y-10">
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-6">Company Information</h2>
              <dl className="space-y-4 font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                <div><dt className="font-semibold text-[#010D3E]">Company Name</dt><dd>ArchipelaGrowth</dd></div>
                <div><dt className="font-semibold text-[#010D3E]">Address</dt><dd>60 E 42nd St #4600<br />New York, NY 10165<br />United States</dd></div>
                <div><dt className="font-semibold text-[#010D3E]">Contact</dt><dd>edouard@archipelmarketing.com</dd></div>
              </dl>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Hosting</h2>
              <div className="bg-white/70 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-6">
                <dl className="space-y-3 font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                  <div><dt className="font-semibold text-[#010D3E]">Host</dt><dd>Lovable (Lovable Cloud)</dd></div>
                  <div><dt className="font-semibold text-[#010D3E]">Company</dt><dd>GPT Engineer Inc.</dd></div>
                  <div><dt className="font-semibold text-[#010D3E]">Website</dt><dd><a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-[#0043F1] underline hover:text-[#0043F1]/80 transition-colors">lovable.dev</a></dd></div>
                </dl>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Intellectual Property</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>All content on this website is protected by international copyright and intellectual property laws. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MentionsLegales;
