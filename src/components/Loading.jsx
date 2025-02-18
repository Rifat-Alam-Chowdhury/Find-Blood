import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col    items-center space-y-4">
      {/* Animated Blood Drop */}
      <div className="relative h-24 w-24">
        {/* Glow Effect */}
        <div className="absolute inset-0 animate-pulse-slow rounded-full bg-primary-600/20 blur-xl"></div>

        {/* Blood Drop */}
        <HeartIcon className="h-full w-full animate-bounce-slow text-primary-200" />

        {/* Rotating Ring */}
        <div className="absolute left-0 top-0 h-full w-full animate-spin-slow rounded-full border-4 border-primary-200 border-t-transparent"></div>
      </div>

      {/* Loading Text */}
      <div className="flex items-center space-x-2  text-primary-200">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 w-1 animate-pulse rounded-full bg-primary-200"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-48 overflow-hidden rounded-full bg-primary-900/20 ">
        <div className="h-full w-1/2 animate-slide bg-gradient-to-r from-primary-200/30 via-primary-200 to-primary-200/30"></div>
      </div>
    </div>
  );
}

export default Loading;
