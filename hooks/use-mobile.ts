import { useEffect, useState } from "react"

interface UseMobileOptions {
  /**
   * The width threshold in pixels below which a device is considered mobile
   * @default 768
   */
  mobileWidth?: number
}

/**
 * React hook to determine if the current device is a mobile device
 * Uses both screen width and user agent detection for better accuracy
 */
export function useIsMobile({ mobileWidth = 768 }: UseMobileOptions = {}): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Function to check if device is mobile
    const checkIsMobile = () => {
      // Check screen width
      const isMobileByWidth = window.innerWidth < mobileWidth

      // Check user agent for mobile devices
      const isMobileByUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )

      // Consider a device mobile if either condition is true
      setIsMobile(isMobileByWidth || isMobileByUserAgent)
    }

    // Check immediately on mount
    checkIsMobile()

    // Add event listeners for responsive behavior
    window.addEventListener("resize", checkIsMobile)
    window.addEventListener("orientationchange", checkIsMobile)

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", checkIsMobile)
      window.removeEventListener("orientationchange", checkIsMobile)
    }
  }, [mobileWidth])

  return isMobile
}