"use client";

import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Button } from "./button";

interface Props {
  title: string;
  children: React.ReactNode;
}
const AdditionalInfoButton = ({ children, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="sm:col-span-2"
    >
      <CollapsibleTrigger asChild className="text-sm text-teal-500">
        <Button
          variant={"link"}
          size={"sm"}
          className="p-0 text-xs text-teal-500"
        >
          {title}
          <span className="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="grid gap-x-6 md:grid-cols-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

AdditionalInfoButton.displayName = "AdditionalInfoButton";

export default AdditionalInfoButton;
