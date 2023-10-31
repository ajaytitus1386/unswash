import axios from "axios"
import {
  AutocompleteResponse,
  ImageCardData,
  ImageFullData,
  ImageSearchResponse,
} from "../types"
import { toast } from "@/components/ui/use-toast"

export const fetchHomeImages = async (
  pageNo: number = 1,
  perPage: number = 10
) => {
  try {
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
  } catch (error: any) {
    if (error.response.status === 403) {
      toast({
        title: "Oops, We hit a snag!",
        description: "Rate limit exceeded. Try again later.",
      })
      return
    }

    toast({
      title: "Error",
      description: "Something went wrong",
    })
  }
}

export const fetchSingleImage = async (id: string) => {
  try {
    const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    })

    const image: ImageFullData = res.data
    return image
  } catch (error: any) {
    if (error.response.status === 403) {
      toast({
        title: "Oops, We hit a snag!",
        description: "Rate limit exceeded. Try again later.",
      })
      return
    }

    toast({
      title: "Error",
      description: "Something went wrong",
    })
  }
}

export const searchImages = async (
  query: string,
  pageNo: number = 1,
  perPage: number = 10
) => {
  try {
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
  } catch (error: any) {
    if (error.response.status === 403) {
      toast({
        title: "Oops, We hit a snag!",
        description: "Rate limit exceeded. Try again later.",
      })
      return
    }

    toast({
      title: "Error",
      description: "Something went wrong",
    })
  }
}

export const getAutoCompleteSuggestions = async (query: string) => {
  if (!query) return
  try {
    const res = await axios.get("/api/autocomplete", {
      params: {
        query,
      },
    })

    const data: AutocompleteResponse = res.data
    return data.autocomplete
  } catch (error: any) {
    toast({
      title: "Error",
      description: "Something went wrong",
    })
  }
}
