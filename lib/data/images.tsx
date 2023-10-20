import axios from "axios"
import {
  AutocompleteResponse,
  ImageCardData,
  ImageFullData,
  ImageSearchResponse,
} from "../types"

export const fetchHomeImages = async (
  pageNo: number = 1,
  perPage: number = 10
) => {
  const res = await axios.get("https://api.unsplash.com/photos", {
    params: {
      page: pageNo,
      per_page: perPage,
    },
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  })

  const images: ImageCardData[] = res.data
  return images
}

export const fetchSingleImage = async (id: string) => {
  const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  })

  const image: ImageFullData = res.data
  return image
}

export const searchImages = async (
  query: string,
  pageNo: number = 1,
  perPage: number = 10
) => {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page: pageNo,
      per_page: perPage,
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
