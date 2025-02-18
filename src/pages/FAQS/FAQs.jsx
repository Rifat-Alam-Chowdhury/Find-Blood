import {
  ChevronDownIcon,
  HeartIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

const FAQs = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer:
        "Healthy adults aged 18-65, weighing at least 50kg. You should not be on any medication for serious conditions and should meet our health screening criteria.",
      icon: UserGroupIcon,
    },
    {
      question: "How often can I donate blood?",
      answer:
        "Whole blood donors can donate every 56 days. Platelet donors can donate up to 24 times a year. Always consult with our staff for personalized guidance.",
      icon: HeartIcon,
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Absolutely. We use sterile, single-use equipment for all donations. Our staff are trained professionals following strict safety protocols.",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      question: "How long does the process take?",
      answer:
        "The actual donation takes 8-10 minutes. With registration and screening, the entire process takes about 45 minutes to 1 hour.",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      question: "Can I donate if I have a tattoo?",
      answer:
        "Yes, if the tattoo was applied at a licensed facility in our state and has healed completely (minimum 6 months).",
      icon: UserGroupIcon,
    },
    {
      question: "What should I do before donating?",
      answer:
        "Eat iron-rich meals, stay hydrated, and get good sleep. Avoid alcohol 24 hours before donation and bring valid ID.",
      icon: HeartIcon,
    },
  ];

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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Quick answers to common questions about blood donation and our
            services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white bg-opacity-5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-opacity-10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-800/50 rounded-lg">
                  <faq.icon className="w-6 h-6 text-primary-200" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-primary-200 mb-6">
            Still have questions? Our team is here to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-900 px-8 py-3 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </button>
            <button className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
