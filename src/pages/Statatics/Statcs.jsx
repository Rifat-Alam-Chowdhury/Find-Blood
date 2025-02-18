import {
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const Statcs = () => {
  return (
    <section className="relative py-16  bg-primary-900">
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

      <div className="px-4 relative ">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Every donation counts. See how we're making a difference together in
            our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: HeartIcon,
              number: "50K+",
              title: "Lives Saved",
              description: "Through blood donations",
            },
            {
              icon: UserGroupIcon,
              number: "10K+",
              title: "Active Donors",
              description: "Registered in our network",
            },
            {
              icon: ClockIcon,
              number: "24/7",
              title: "Support",
              description: "Emergency services available",
            },
            {
              icon: HandThumbUpIcon,
              number: "98%",
              title: "Satisfaction",
              description: "Donor experience rating",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className=" bg-white bg-opacity-5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-opacity-10 transition-all duration-300"
            >
              <div className="flex flex-col items-start">
                <div className="mb-4 p-3 bg-primary-800 rounded-lg group-hover:bg-primary-700 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary-200 group-hover:text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold text-primary-200 mb-2">
                  {stat.title}
                </h3>
                <p className="text-sm text-gray-300">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-primary-200 mb-6">
            Ready to be part of these numbers?
          </p>
          <button className="bg-white text-primary-900 px-8 py-3 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105">
            Become a Donor Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Statcs;
