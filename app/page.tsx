import Hero from "@/components/Hero"
import MasonGrid from "@/components/MasonGrid"
import { fetchHomeImages } from "@/lib/data/images"
import Image from "next/image"
import React from "react"

async function getHomeData() {
  const images = await fetchHomeImages()

  return images
}

const Home = async () => {
  const images = await getHomeData()
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
