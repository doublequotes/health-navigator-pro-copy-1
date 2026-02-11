import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";

// Extended button variants for the medical tourism app
export const heroButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        hero: "bg-accent-gradient text-accent-foreground shadow-elevated hover:opacity-90 hover:shadow-glow px-8 py-6 text-base",
        heroOutline: "border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-base",
        cta: "bg-accent-gradient text-accent-foreground shadow-soft hover:shadow-elevated px-6 py-3",
        ghost_nav: "text-foreground/70 hover:text-foreground hover:bg-secondary px-4 py-2",
      },
    },
  }
);

export { Button };
