import { UserCircleIcon, HeartIcon, StarIcon } from "@heroicons/react/24/solid";

const Testimonials = () => {
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
            Stories of Hope
          </h2>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Hear from those whose lives were changed through blood donation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="group bg-white bg-opacity-5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-opacity-10 transition-all duration-300"
            >
              <HeartIcon className="w-8 h-8 text-primary-200 mb-4 opacity-75" />
              <p className="text-gray-300 mb-6">
                "Thanks to generous donors, my daughter received the blood she
                needed during her surgery. This platform made finding compatible
                donors quick and stress-free."
              </p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <UserCircleIcon className="w-12 h-12 text-primary-200" />
                  <div className="absolute -bottom-1 -right-1 bg-primary-600 rounded-full p-1">
                    <StarIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Sarah Johnson</h4>
                  <p className="text-sm text-primary-200">Mother & Recipient</p>
                  <div className="flex items-center gap-1 mt-1">
                    <HeartIcon className="w-4 h-4 text-primary-400" />
                    <span className="text-sm text-gray-400">3 lives saved</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-10">
                <svg
                  className="w-16 h-16 text-primary-200"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M100 15c-25 45-75 60-75 100 0 45 40 85 75 85s75-40 75-85c0-40-50-55-75-100z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-primary-200 mb-6">
            Ready to share your story?
          </p>
          <button className="bg-white text-primary-900 px-8 py-3 rounded-full font-semibold hover:bg-primary-100 transition-all duration-300 transform hover:scale-105">
            Add Your Testimonial
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
