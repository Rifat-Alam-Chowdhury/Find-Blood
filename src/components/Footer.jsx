import {
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-primary-900 to-primary-800">
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="mb-8 md:mb-0">
            <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
              <HeartIcon className="w-6 h-6 text-primary-200" />
              Blood
            </h3>
            <p className="text-gray-300 text-sm">
              Connecting life-savers with those in need since 2025. A non-profit
              initiative dedicated to making blood donation accessible and
              efficient.
            </p>
            <div className="mt-4 flex gap-3">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-gray-300 hover:text-primary-200 transition-colors"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <GlobeAltIcon className="w-5 h-5" />
                  </a>
                )
              )}
            </div>
          </div>

          <div className="mb-8 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Donor Registration",
                "Find Donors",
                "Request Blood",
                "About Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-primary-200" />
                <span className="text-gray-300 text-sm">12 Mirpur, Dhaka</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-primary-200" />
                <a
                  href="tel:+11234567890"
                  className="text-gray-300 text-sm hover:text-white"
                >
                  (+88) 01795952503
                </a>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-primary-200" />
                <a
                  href="mailto:help@bloodlink.org"
                  className="text-gray-300 text-sm hover:text-white"
                >
                  Rifatalamtabs2@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Stay Updated
            </h4>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-white bg-opacity-5 rounded-lg border border-white/10 text-white placeholder-gray-300 focus:border-primary-200 outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Blood. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-200 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-200 text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
