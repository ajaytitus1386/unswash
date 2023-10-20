import React from "react"

type SearchResultsHeadersProps = {
  query: string
  resultsCount: number
}

const SearchResultsHeader: React.FC<SearchResultsHeadersProps> = ({
  query,
  resultsCount,
}) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold text-2xl capitalize">
        {query}
      </h1>
      <h2 className="text-text-light-400 dark:text-text-dark-400 font-light text-base">
        Results Found: {resultsCount}
      </h2>
    </div>
  )
}

export default SearchResultsHeader
