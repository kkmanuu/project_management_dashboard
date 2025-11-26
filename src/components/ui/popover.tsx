import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

/**
 * Popover root component.
 * Controls the open/close state of the popover.
 */
const Popover = PopoverPrimitive.Root;

/**
 * Trigger element that opens/closes the popover.
 * Can wrap any element (e.g., button, icon, text).
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Popover content (the floating panel).
 * Uses Radix Popover.Content but wrapped with custom styling
 * and forwardRef for accessibility and control.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    {
      className,
      align = "center", // Default horizontal alignment
      sideOffset = 4,    // Default distance from the trigger
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      {/* Popover floating panel */}
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // Default styles + animations
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
          // Animate on open / close
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          // Fade in/out animations
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          // Zoom animations
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          // Slide animations depending on side
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Exporting as a clean Radix wrapper
export { Popover, PopoverTrigger, PopoverContent };
