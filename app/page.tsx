"use client"

import Hero from "@/components/Hero"
import MasonGrid from "@/components/MasonGrid"
import { fetchHomeImages, searchImages } from "@/lib/data/images"
import { ImageCardData } from "@/lib/types"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const Home = () => {
  const params = useSearchParams()
  const searchQuery = params.get("search")
  const [images, setImages] = useState<ImageCardData[]>([])
  const [pagesLoaded, setPagesLoaded] = useState(1)

  useEffect(() => {
    async function getHomeData() {
      const initialImages = await fetchHomeImages()

      setImages(initialImages)
    }
    getHomeData()
  }, [])

  useEffect(() => {
    async function getQueryImages() {
      if (searchQuery) {
        const queryImages = await searchImages(searchQuery)
        setImages(queryImages.results)
      }
    }
    getQueryImages()
  }, [params, searchQuery])

  return (
    <div className="w-full h-full">
      <Hero />

      {images.length > 0 ? (
        <MasonGrid images={images} />
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
