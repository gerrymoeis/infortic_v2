'use client'

import { usePathname } from 'next/navigation'
import { BackgroundElements } from '@/components/ui/background-elements'

// Define the paths where the background should be displayed
const pathsWithBackground = ['/lomba', '/beasiswa', '/magang']

export function ConditionalBackground() {
  const pathname = usePathname()

  // Check if the current path starts with one of the specified paths
  const showBackground = pathsWithBackground.some(path => pathname.startsWith(path))

  if (!showBackground) {
    return null
  }

  return <BackgroundElements />
}
