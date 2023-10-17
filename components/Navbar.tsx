"use client"

import React from "react"
import { Search, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Link from "next/link"
import { Switch } from "./ui/switch"
import { useAppContext } from "./context/AppContext"

const NavElements = () => {
  const { toggleTheme, theme } = useAppContext()

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <Link
        href="#"
        className="text-text-light-600 dark:text-text-dark-600 text-sm"
      >
        Explore
      </Link>
      <Link
        href="#"
        className="text-text-light-600 dark:text-text-dark-600 text-sm"
      >
        Collection
      </Link>
      <Link
        href="#"
        className="text-text-light-600 dark:text-text-dark-600 text-sm"
      >
        Community
      </Link>
      <div className="flex items-center justify-start space-x-2">
        <label className="text-text-light-600 dark:text-text-dark-600 text-sm">
          Dark Mode
        </label>
        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      </div>
    </div>
  )
}

const Navbar = () => {
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <h1 className="font-pattaya text-2xl text-text-light-600 dark:text-text-dark-600">
        Image Gallery
      </h1>
      <div className="flex items-center justify-center space-x-2">
        <button type="button">
          <Search className="text-text-light-500 dark:text-text-dark-500 text-lg" />
        </button>
        <Sheet>
          <SheetTrigger className="flex items-center justify-center">
            <button type="button">
              <Menu className="text-text-light-500 dark:text-text-dark-500 text-lg" />
            </button>
          </SheetTrigger>
          <SheetContent className="h-screen flex flex-col justify-between items-start">
            <NavElements />
            <SheetFooter>Made by Ajay Titus</SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
