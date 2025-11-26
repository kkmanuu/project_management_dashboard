import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

/**
 * Separator Component
 *
 * A flexible horizontal or vertical divider for visually grouping content.
 * This component wraps Radix UI's Separator and applies Tailwind styling.
 *
 * Props:
 * - orientation: "horizontal" | "vertical" (default: horizontal)
 * - decorative: boolean — indicates whether the element is purely visual
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      // Horizontal: full width, 1px height
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
));

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
