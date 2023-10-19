"use client"

import { ImageCardData } from "@/lib/types"
import React from "react"
import Masonry from "react-masonry-css"
import ImageCard from "./ImageCard"

interface MasonGridProps {
  images: ImageCardData[]
}

const MasonGrid: React.FC<MasonGridProps> = ({ images }) => {
  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1440: 3,
        768: 3,
        640: 2,
        410: 1,
      }}
      className="w-auto flex space-x-2 sm:space-x-4 md:space-x-8"
      columnClassName="bg-clip-padding"
    >
      {images.map((imageData) => (
        <ImageCard key={imageData.id} imageData={imageData} />
      ))}
    </Masonry>
  )
}

export default MasonGrid
