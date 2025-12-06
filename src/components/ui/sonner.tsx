import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

// Type for Toaster props based on Sonner's component
type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // Get current theme (light, dark, or system)
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      // Apply current theme to the toast system
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Custom styling for toast components
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
