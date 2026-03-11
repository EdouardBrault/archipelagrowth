
const steps = [
  { number: "1.", label: "Audit" },
  { number: "2.", label: "Strategy" },
  { number: "3.", label: "Deployment" },
];

const Methodologie = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            Our Approach
          </span>
        </div>

        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            A concrete and effective methodology
          </span>
        </h2>

        <p className="text-lg text-[#010D3E] mb-12 max-w-2xl mx-auto leading-relaxed font-inter">
          At ArchipelaGrowth, we've designed a proven methodology to boost our clients' visibility across generative AI platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.label} className="bg-gray-100 rounded-2xl p-10 text-center">
              <div className="font-jakarta text-6xl md:text-7xl font-bold text-[#0043F1] mb-4">{step.number}</div>
              <p className="text-[#010D3E] font-dm-sans text-lg font-bold">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodologie;
