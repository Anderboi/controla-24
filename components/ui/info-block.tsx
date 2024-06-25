import { cn } from "@/utils/utils";
import React from "react";

const InfoBlock = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article ref={ref} className={cn("space-y-4", className)} {...props} />
));
InfoBlock.displayName = "InfoBlock";

const InfoBlockIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <article ref={ref} className={cn("", className)} {...props} />
));
InfoBlockIcon.displayName = "InfoBlockIcon";

const InfoBlockTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "mb-2 text-xl font-medium leading-none tracking-tight",
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
      "relative space-y-2 rounded-xl dark:border py-4 pl-4 bg-white dark:border-none dark:bg-neutral-900",
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
    className={cn("gap-x-2 pr-4 md:grid gap-y-4 grid-cols-[1fr_2fr]", className)}
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
    className={cn("text-lg sm:text-base text-black dark:text-neutral-200", className)}
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
      "dark:text-text-neutral-400 text-lg sm:text-base text-neutral-500",
      className,
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
  InfoBlockIcon,
};
