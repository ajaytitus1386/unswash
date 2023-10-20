"use client"

import React, { useRef, useState } from "react"

import { Input } from "./ui/input"
import { SearchIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { AutocompleteResponseItem } from "@/lib/types"
import { getAutoCompleteSuggestions } from "@/lib/data/images"

type SearchProps = {
  variant: "hero" | "navbar"
  onClear?: () => void
}

const SearchBar = ({ variant, onClear }: SearchProps) => {
  const { push } = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    AutocompleteResponseItem[]
  >([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const autocompletePopoverTrigger = useRef<HTMLButtonElement>(null)

  const changeQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)

    const auto = await getAutoCompleteSuggestions(e.target.value)
    setAutocompleteSuggestions(auto)
  }

  const clearQuery = () => {
    setSearchQuery("")
    setAutocompleteSuggestions([])
    onClear && onClear()
  }

  const search = (query: string) => {
    push(`/?search=${query}`)
  }

  const selectAutocompleteSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    search(suggestion)
    // Blur out of focus from the suggestions popover
    autocompletePopoverTrigger?.current?.blur()
    // Reset the suggestions
    setAutocompleteSuggestions([])
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={cn(
          "flex space-x-1 px-2 py-1 justify-center items-center bg-bg-light-card dark:bg-bg-dark-card rounded-md",
          variant === "hero" ? "w-full" : "flex w-auto md:w-96"
        )}
      >
        <button type="submit" onClick={() => search(searchQuery)}>
          <SearchIcon className="text-text-light-300 dark:text-text-dark-300" />
        </button>
        {/* Search Input */}
        <Input
          ref={searchInputRef}
          className="bg-bg-light-card dark:bg-bg-dark-card border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
          placeholder={
            variant ? "Search for High Res Images" : "Search for Images"
          }
          value={searchQuery}
          onChange={changeQuery}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            autocompletePopoverTrigger.current?.click()
          }}
        />
        {(searchQuery || variant === "navbar") && (
          <button type="button" onClick={clearQuery}>
            <XIcon className="text-text-light-300 dark:text-text-dark-300" />
          </button>
        )}
      </form>
      <Popover>
        <PopoverTrigger ref={autocompletePopoverTrigger}></PopoverTrigger>
        {autocompleteSuggestions.length > 0 && (
          <PopoverContent
            onOpenAutoFocus={(e: React.FocusEvent<HTMLElement>) =>
              e.preventDefault()
            }
            className={cn(
              "flex flex-col space-y-1 items-start justify-center w-[80vw] px-0 -mt-4 bg-bg-light-card dark:bg-bg-dark-card",
              variant === "navbar" && "z-50 w-96 mt-0"
            )}
          >
            {autocompleteSuggestions.map((suggestion, index) => (
              <button
                key={"suggestion_" + index}
                className="w-full text-left px-4 text-text-light-500 dark:text-text-dark-500 font-base hover:bg-bg-light-primary dark:hover:bg-bg-dark-primary"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  selectAutocompleteSuggestion(suggestion.query)
                }}
              >
                {suggestion.query}
              </button>
            ))}
          </PopoverContent>
        )}
      </Popover>
    </>
  )
}

export default SearchBar
