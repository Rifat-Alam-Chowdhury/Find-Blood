import {
  UserIcon,
  PhoneIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";

const Bloodreqlanding = () => {
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
            Request Blood Assistance
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Submit your blood requirement and connect with matching donors
            instantly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white bg-opacity-5 rounded-2xl backdrop-blur-sm p-8 border border-white/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <UserIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Patient Name"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <HomeIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Hospital Name"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <HeartIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <select
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white appearance-none focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                >
                  <option value="">Required Blood Type</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="relative">
                <ClockIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <select
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white appearance-none focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                >
                  <option value="">Select Urgency</option>
                  <option>Emergency (Within 1 hour)</option>
                  <option>Urgent (Within 4 hours)</option>
                  <option>Critical (Within 12 hours)</option>
                  <option>Standard (Within 24 hours)</option>
                </select>
              </div>

              <div className="relative">
                <MapPinIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Hospital Address"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="relative">
                <PhoneIcon className="w-6 h-6 text-primary-200 absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <textarea
                placeholder="Additional Notes (Case details, special requirements)"
                className="w-full pl-4 pr-4 py-3 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 focus:ring-2 focus:ring-primary-200/20 outline-none transition-all h-32"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="consent"
                className="w-5 h-5 text-primary-600 bg-white bg-opacity-10 border border-white/20 rounded focus:ring-primary-200/30"
                required
              />
              <label htmlFor="consent" className="ml-3 text-sm text-gray-300">
                I verify this is a genuine medical requirement
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <HeartIcon className="w-6 h-6 mr-2" />
              Send Blood Request
            </button>
          </form>

          <div className="mt-8 p-4 bg-primary-800/30 rounded-lg text-center">
            <p className="text-sm text-primary-200">
              For immediate emergency assistance, call our 24/7 helpline:
              <span className="font-semibold text-white ml-2">919199</span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            All requests are verified by our medical team before being sending
            to donors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Bloodreqlanding;
