import axios from "axios"
import { ImageCardData } from "../types"

export const fetchHomeImages = async () => {
  const res = await axios.get("https://api.unsplash.com/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  })

  const images: ImageCardData[] = res.data
  return images
}
