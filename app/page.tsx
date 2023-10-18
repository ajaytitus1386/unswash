import Hero from "@/components/Hero"
import MasonGrid from "@/components/MasonGrid"
import { fetchHomeImages } from "@/lib/data/images"
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

      {images.length > 0 ? <MasonGrid images={images} /> : <></>}
    </div>
  )
}

export default Home
