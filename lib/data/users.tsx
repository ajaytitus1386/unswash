import axios from "axios"
import { ProfileData } from "../types"
import { toast } from "@/components/ui/use-toast"

export const fetchUserProfile = async (username: string) => {
  try {
    const res = await axios.get(`https://api.unsplash.com/users/${username}`, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    })

    const profile: ProfileData = res.data
    return profile
  } catch (error: any) {
    toast({
      title: "Uh oh, we couldn't find that user!",
      description: "Please try again later.",
    })
  }
}
