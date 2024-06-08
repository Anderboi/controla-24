import React from "react";

const Stepper = ({
  steps,
  currentStep,
}: {
  steps: { id: string; name: string; fields?: string[] }[];
  currentStep: number;
}) => {
  return (
    <nav aria-label="Progress" className='hidden sm:block'>
      <ol
        role="list"
        className="mb-4 space-y-2 md:flex md:space-x-2 md:space-y-0"
      >
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            {currentStep > index ? (
              <div className="group flex w-full min-w-2 flex-col border-l-4 border-teal-800 py-2 pl-4 transition-colors md:border-b-4 md:border-l-0 md:pb-2 md:pl-0 md:pt-0">
                <span className="hidden text-xs font-medium text-teal-600 transition-colors md:block">
                  {step.id}
                </span>
              </div>
            ) : currentStep === index ? (
              <div
                className="flex w-full min-w-2 flex-col border-l-4 border-teal-400 py-2 pl-4 md:border-b-4 md:border-l-0 md:pb-2 md:pl-0 md:pt-0"
                aria-current="step"
              >
                <span className="hidden text-xs font-medium text-teal-400 md:block">
                  {step.id}
                </span>
              </div>
            ) : (
              <div className="group flex w-full min-w-2 flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-b-4 md:border-l-0 md:pb-2 md:pl-0 md:pt-0">
                <span className="hidden text-xs font-medium text-gray-500 transition-colors md:block">
                  {step.id}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
