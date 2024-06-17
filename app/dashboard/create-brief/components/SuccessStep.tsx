import { Check } from 'lucide-react';
import React from 'react'

interface SuccessStepProps {
  steps: {id:string, name: string; fields?: string[] }[]
}
const SuccessStep = ({steps}: SuccessStepProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold">Вы успешно создали проект!</h2>
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