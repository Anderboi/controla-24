import React from 'react'
import { Check } from 'lucide-react';
import { SuccessStepProps } from '@/types';


const SuccessStep = ({steps}: SuccessStepProps) => {
  return (
    <>
      <div className="space-y-2">
        {steps.map(
          (step, stepIndex) =>
            stepIndex < steps.length - 1 && (
              <div key={stepIndex} className="flex items-center gap-2">
                <Check className="size-[14px]" />
                <div className="text-xs">{step.name}</div>
              </div>
            ),
        )}
      </div>
    </>
  );
}

export default SuccessStep