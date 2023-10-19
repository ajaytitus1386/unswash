import axios from "axios"
import {
  AutocompleteResponse,
  ImageCardData,
  ImageSearchResponse,
} from "../types"

export const fetchHomeImages = async () => {
  const res = await axios.get("https://api.unsplash.com/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  })

  const images: ImageCardData[] = res.data
  return images
}

export const searchImages = async (query: string, pageNo: number = 1) => {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page: pageNo,
    },
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  })

  const searchResponse: ImageSearchResponse = res.data
  return searchResponse
}

export const getAutoCompleteSuggestions = async (query: string) => {
  const uriQuery = encodeURIComponent(query)

  const res = await axios.get(`https://unsplash.com/nautocomplete/${uriQuery}`)

  const auto: AutocompleteResponse = res.data

  return auto.autocomplete
}
