import * as React from "react";

// Define the breakpoint for mobile devices
const MOBILE_BREAKPOINT = 768;

/**
 * Custom hook to determine if the current viewport is considered "mobile".
 *
 * @returns {boolean} true if screen width is less than MOBILE_BREAKPOINT, false otherwise
 */
export function useIsMobile() {
  // Track whether the screen is mobile-sized
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Create a media query list for screens smaller than the breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Handler to update state when screen size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Listen for changes in media query
    mql.addEventListener("change", onChange);

    // Set initial value based on current window size
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Cleanup listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Return boolean (default to false if undefined)
  return !!isMobile;
}
