
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import ContactProtection from "@/components/ContactProtection";

const PolitiqueConfidentialite = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | ArchipelaGrowth</title>
        <meta name="description" content="Privacy Policy for ArchipelaGrowth – collection, processing, and protection of your personal data." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #D2DCFF 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-[#010D3E] mb-12">Privacy Policy</h1>
          <div className="space-y-10">
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Data Controller</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-2">
                <p>ArchipelaGrowth</p>
                <p>60 E 42nd St #4600, New York, NY 10165, United States</p>
                <p>Contact: edouard@archipelmarketing.com</p>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Personal Data Collected</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>We may collect the following categories of data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Identification data:</strong> name, email address, phone number, company name.</li>
                  <li><strong>Connection data:</strong> IP address, browser type, pages visited, date and time of visit.</li>
                  <li><strong>Form data:</strong> any information you voluntarily share with us.</li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Purpose of Processing</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Responding to your contact and quote requests.</li>
                  <li>Improving our website and services through analytics.</li>
                  <li>Sending marketing communications (only with your prior consent).</li>
                  <li>Complying with our legal obligations.</li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Your Rights</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>You have the right to access, rectify, delete, limit, and port your personal data. To exercise these rights, contact us:</p>
                <ContactProtection />
              </div>
            </div>
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Cookies</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>Our website uses cookies to ensure proper functioning and analyze traffic. You can manage your cookie preferences through your browser settings at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PolitiqueConfidentialite;
