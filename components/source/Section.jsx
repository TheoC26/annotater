import React from "react";

const Section = ({ isLoading, title, children }) => {
  return (
    <div className="pt-32 -mt-32" id={title}>
      <div className="w-full bg-white rounded-2xl mb-6 p-6">
        <div className="font-bold text-3xl mb-3">{title}</div>
        {isLoading && (
          <>
            <div className="mr-10 h-6 loadingAnimatedGradient rounded mb-1"></div>
            <div className="mr-28 h-6 loadingAnimatedGradient rounded mb-1"></div>
            <div className="mr-16 h-6 loadingAnimatedGradient rounded mb-1"></div>
            <div className="mr-4 h-6 loadingAnimatedGradient rounded mb-1"></div>
            <div className="mr-10 h-6 loadingAnimatedGradient rounded mb-1"></div>
            <div className="mr-24 h-6 loadingAnimatedGradient rounded mb-1"></div>
            <div className="mr-8 h-6 loadingAnimatedGradient rounded mb-1"></div>
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default Section;
