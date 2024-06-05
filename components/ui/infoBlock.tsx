import { cn } from "@/utils/utils";
import React from "react";

const InfoBlock = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article ref={ref} className={cn("", className)} {...props} />
));
InfoBlock.displayName = "InfoBlock";

const InfoBlockTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "mb-4 text-lg font-semibold leading-none tracking-tight",
      className,
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
      "relative space-y-2 rounded-xl border py-4 pl-4 dark:border-none dark:bg-neutral-900",
      className,
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
    className={cn("justify-between gap-x-2 pr-4 sm:flex", className)}
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
    className={cn("text-neutral-400 dark:text-neutral-400", className)}
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
    className={cn("text-neutral-500 dark:text-neutral-400", className)}
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
