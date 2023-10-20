"use client"

import React from "react"

import { Input } from "./ui/input"
import { SearchIcon } from "lucide-react"

type SearchProps = {
  variant: "hero" | "navbar"
}

const Search = ({ variant }: SearchProps) => {
  return (
    <div className="w-full flex space-x-1 px-2 py-1 justify-center items-center bg-bg-light-card dark:bg-bg-dark-card rounded-md">
      <SearchIcon className="text-text-light-300 dark:text-text-dark-300 text-lg" />
      <Input
        className="bg-bg-light-card dark:bg-bg-dark-card border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
        placeholder={
          variant ? "Search for High Res Images" : "Search for Images"
        }
      />
    </div>
  )
}

export default Search
