import {
  ClipboardDocumentCheckIcon,
  HeartIcon,
  BeakerIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

const Howweworks = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-primary-800 to-primary-900">
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10h10v10H10zM30 30h10v10H30zM50 50h10v10H50zM70 70h10v10H70zM90 90h10v10H90z"
            fill="currentColor"
            className="text-primary-600"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple Donation Process
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Become a life-saver in just 4 easy steps. Your journey to saving
            lives starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: ClipboardDocumentCheckIcon,
              step: "01",
              title: "Register & Screen",
              description:
                "Complete quick registration and health questionnaire",
            },
            {
              icon: BeakerIcon,
              step: "02",
              title: "Health Check",
              description: "Quick physical checkup by our medical team",
            },
            {
              icon: HeartIcon,
              step: "03",
              title: "Donate Blood",
              description: "Safe & comfortable donation process",
            },
            {
              icon: GiftIcon,
              step: "04",
              title: "Refresh & Recieve",
              description: "Get snacks and digital donor certificate",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="group relative bg-white bg-opacity-5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-opacity-10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {step.step}
              </div>

              <div className="mb-6 p-4 bg-primary-800/50 rounded-xl w-max mx-auto group-hover:bg-primary-700 transition-colors">
                <step.icon className="w-10 h-10 text-primary-200 group-hover:text-white" />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>

              <div className="absolute inset-0 rounded-2xl border-2 border-primary-600/0 group-hover:border-primary-600/30 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-12 lg:mt-16 max-w-3xl mx-auto text-center">
          <div className="bg-primary-800/30 p-6 rounded-2xl backdrop-blur-sm">
            <p className="text-primary-200 text-lg">
              <span className="font-semibold text-white">Safety First:</span>{" "}
              All equipment is sterilized and single-use. Our centers follow
              strict COVID-19 safety protocols.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howweworks;
