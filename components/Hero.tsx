"use client"

import React from "react"
import Search from "./Search"

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/images/hero.jpg)",
      }}
      className="relative z-1 w-full h-1/2 2xl:h-1/3 bg-no-repeat bg-cover bg-center"
    >
      {/* To Top Darkening Gradient */}
      <div className="absolute z-2 w-full h-full top-0 left-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-3 w-4/5 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Download High Quality Images by Creators Worldwide
        </h1>
        <p className="text-center text-xs text-white">
          Over 2.4 million+ stock images by our talented community
        </p>
        <Search variant="hero" />
      </div>
    </div>
  )
}

export default Hero
