import axios from "axios"
import { ProfileData } from "../types"

export const fetchUserProfile = async (username: string) => {
  const res = await axios.get(`https://api.unsplash.com/users/${username}`, {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
  })

  const profile: ProfileData = res.data
  return profile
}
