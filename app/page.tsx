"use client"

import Hero from "@/components/Hero"
import InfiniteScroll from "@/components/InfiniteScroll"
import MasonGrid from "@/components/MasonGrid"
import SearchResultsHeader from "@/components/SearchResultsHeader"
import { fetchHomeImages, searchImages } from "@/lib/data/images"
import { ImageCardData } from "@/lib/types"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const Home = () => {
  const params = useSearchParams()
  const searchQuery = params.get("search")
  const [images, setImages] = useState<ImageCardData[] | null>(null)
  const [resultCount, setResultCount] = useState(0)
  const [pagesLoaded, setPagesLoaded] = useState(1)

  // Fetch initial images
  useEffect(() => {
    // Adding a change in app/ directory to trigger a workflow
    async function getHomeData() {
      const initialImages = await fetchHomeImages()
      if (!initialImages) return
      setImages(initialImages)
    }
    //Reset the page number to 1
    setPagesLoaded(1)
    getHomeData()
  }, [])

  // Fetch images when query changes
  useEffect(() => {
    async function getQueryImages() {
      if (searchQuery) {
        const queryImages = await searchImages(searchQuery)
        if (!queryImages) return
        setImages(queryImages.results)
        setResultCount(queryImages.total)
      }
    }
    //Reset the page number to 1
    setPagesLoaded(1)
    getQueryImages()
  }, [params, searchQuery])

  const onPagination = async () => {
    if (!images) return

    if (searchQuery) {
      const queryImages = await searchImages(searchQuery, pagesLoaded + 1)
      if (!queryImages) return
      setImages(images.concat(queryImages.results))
      setPagesLoaded(pagesLoaded + 1)
    } else {
      const queryImages = await fetchHomeImages(pagesLoaded + 1)
      if (!queryImages) return
      setImages(images.concat(queryImages))
      setPagesLoaded(pagesLoaded + 1)
    }
  }

  return (
    <div className="w-full h-full">
      {/* Hero */}
      {!searchQuery && <Hero />}

      {/* Image Grid */}
      {images ? (
        images.length > 0 ? (
          <div className="py-8 px-2 sm:px-4 md:px-8">
            {searchQuery && (
              <SearchResultsHeader
                query={searchQuery}
                resultsCount={resultCount}
              />
            )}
            <MasonGrid images={images} />
            <InfiniteScroll id="mason_grid" onMore={onPagination} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-text-light-400 dark:text-text-dark-400 font-bold text-xl">
              No results found
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            width={320}
            height={320}
            src={"/images/loading.gif"}
            alt="Loading"
            className="mix-blend-multiply"
          />
          <p className="text-text-light-400 dark:text-text-dark-400 font-bold text-xl">
            Loading images...
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
