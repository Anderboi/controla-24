import { cn } from "@/utils/utils";
import React from "react";

const InfoBlock = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn("//space-y-2 ", className)}
    {...props}
  />
));
InfoBlock.displayName = "InfoBlock";

const InfoBlockTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold text-lg leading-none tracking-tight mb-4",
      className
    )}
    {...props}
  />
));
InfoBlockTitle.displayName = "InfoBlockTitle";

const InfoBlockContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "space-y-2 border dark:border-none dark:border-neutral-800 dark:bg-neutral-900 rounded-xl py-4 pl-4 relative",
      className
    )}
    {...props}
  />
));
InfoBlockContent.displayName = "InfoBlockContent";

const InfoBlockItem = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "//grid gap-x-2 //md:grid-cols-[1fr_2fr] sm:flex justify-between pr-4",
      className
    )}
    {...props}
  />
));
InfoBlockItem.displayName = "InfoBloInfoBlockItemckLabel";

const InfoBlockLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "//text-sm text-neutral-400 dark:text-neutral-400",
      className
    )}
    {...props}
  />
));
InfoBlockLabel.displayName = "InfoBlockLabel";

const InfoBlockValue = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "//text-sm text-neutral-500 dark:text-neutral-400",
      className
    )}
    {...props}
  />
));
InfoBlockValue.displayName = "InfoBlockValue";

export {
  InfoBlock,
  InfoBlockTitle,
  InfoBlockContent,
  InfoBlockLabel,
  InfoBlockValue,
  InfoBlockItem,
};
