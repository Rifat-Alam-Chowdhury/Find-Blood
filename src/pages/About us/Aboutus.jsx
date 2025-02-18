import {
  HeartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const Aboutus = () => {
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
            Our Life-Saving Mission
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Connecting compassion with need through safe, modern blood donation
            solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white bg-opacity-5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary-800/50 rounded-lg">
                <HeartIcon className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="text-2xl font-bold text-white">Why We Exist</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Every 2 seconds, someone needs blood. Founded in 2023, we bridge
              the gap between voluntary donors and patients in critical need
              through technology-driven solutions. Our platform has facilitated
              over 500,000 successful donations to date.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-primary-200 text-sm">Trusted by:</span>
              <div className="flex gap-4 opacity-75">
                <span className="text-white">🏥 RedCross</span>
                <span className="text-white">➕ WHO</span>
                <span className="text-white">❤️ NHS</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: UserGroupIcon,
                title: "Donor-Centric Approach",
                text: "Personalized donor experience with real-time impact tracking",
              },
              {
                icon: ShieldCheckIcon,
                title: "Safety First",
                text: "ISO-certified processes and HIPAA-compliant data handling",
              },
              {
                icon: GlobeAltIcon,
                title: "National Network",
                text: "Serving 150+ cities with 24/7 emergency support",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group bg-white bg-opacity-5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-opacity-10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary-800/50 rounded-lg group-hover:bg-primary-700 transition-colors">
                    <value.icon className="w-6 h-6 text-primary-200" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-300 text-sm">{value.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Medical Experts", count: "150+" },
            { name: "Donation Centers", count: "2.8k" },
            { name: "Volunteers", count: "10k+" },
            { name: "Lives Impacted", count: "1M+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-5 p-4 rounded-xl backdrop-blur-sm text-center border border-white/10"
            >
              <div className="text-3xl font-bold text-primary-200 mb-2">
                {stat.count}
              </div>
              <div className="text-sm text-gray-300">{stat.name}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105">
            Join Our Mission
          </button>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
