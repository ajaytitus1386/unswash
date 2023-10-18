import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const readColorScheme = () => {
  if (!localStorage) return

  let colorScheme = localStorage.getItem("color-scheme")

  if (!colorScheme) {
    if (!window) return
    if (!window.matchMedia) return

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      colorScheme = "dark"
      localStorage.setItem("color-scheme", "dark")
    } else {
      colorScheme = "light"
      localStorage.setItem("color-scheme", "light")
    }
  }

  return colorScheme
}

export const setColorScheme = (colorScheme: string) => {
  if (!localStorage) return

  localStorage.setItem("color-scheme", colorScheme)
}
