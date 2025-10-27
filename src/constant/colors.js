// src/constant/color.js

// Light theme colors
export const BRAND = {
  primary: "#46b652",
  orange: "#FF8A3D",
  orangeLight: "#FFE6D7",
  blue: "#0d47a1",
  green: "#10B981",
  yellow: "#F59E0B",
  pink: '#f386b9',
  sky: '#51c8ff',
//   bg: "#F5F7FF",
  bg: "#FFF",

  text: "#1F2937",
  muted: "#6B7280",
  white: "#FFFFFF",
  border: "#E5E7EB",
  foreground: '#615fdf', // Fixed typo: forground -> foreground
  black: "#000000",
  gray: {
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827"
  }
}

// Dark theme colors
export const DARK = { // Fixed: Changed 'Dark' to 'DARK' (conventional naming)
  primary: "#5cd169", // Lighter shade for dark mode
  orange: "#FF9A5C",
  orangeLight: "#332219",
  blue: "#3b82f6",
  green: "#34D399",
  yellow: "#FBBF24",
  pink: '#f59ac9',
  sky: '#6bd4ff',
  bg: "#0F172A",
  // bg: "#000000ff", // Dark background
   // Dark background
  text: "#F1F5F9", // Light text for dark mode
  muted: "#94A3B8",
  white: "#1E293B", // Dark surface
  border: "#334155",
  foreground: '#7d7bff',
  black: "#FFFFFF", // Inverted for dark mode
  gray: {
    100: "#1E293B",
    200: "#334155",
    300: "#475569",
    400: "#64748B",
    500: "#94A3B8",
    600: "#CBD5E1",
    700: "#E2E8F0",
    800: "#F1F5F9",
    900: "#F8FAFC"
  }
}

// Alternative organization if you prefer nested structure:
export const THEME = {
  light: BRAND,
  dark: DARK
}

// Usage examples:
// import { BRAND, DARK } from '../../src/constant/color'
// import { THEME } from '../../src/constant/color'

export default {
  BRAND,
  DARK,
  THEME
}