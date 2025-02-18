import {
  UserCircleIcon,
  EnvelopeIcon,
  CalendarIcon,
  MapPinIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  CameraIcon,
  GlobeAltIcon,
  HashtagIcon,
  HomeIcon,
  MapIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const Donnerreg = () => {
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
            Join Our Lifesavers Community
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Register as a blood donor in just 5 minutes. Your information helps
            us save lives faster.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white bg-opacity-5 rounded-2xl backdrop-blur-sm p-8 border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <UserCircleIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <EnvelopeIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <PhoneIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <CalendarIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <HeartIcon className="w-6 h-6 mr-2" />
              Become a Donor
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-300">
              Already a donor?
              <a
                href="#login"
                className="text-primary-200 hover:text-white ml-2 underline"
              >
                Log in to your account
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Your information is protected with 256-bit SSL encryption. We never
            share your data with third parties.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Donnerreg;
