/* ------------------------- User Profiles Unsplash ------------------------- */

export type ProfileData = {
  id: string
  updated_at: string
  username: string
  name: string
  first_name: string
  last_name: string
  instagram_username: string
  twitter_username: string
  portfolio_url: any
  bio: string
  location: string
  total_likes: number
  total_photos: number
  total_collections: number
  followed_by_user: boolean
  followers_count: number
  following_count: number
  downloads: number
  social: Social
  profile_image: ProfileImage
  badge: Badge
  links: Links
}

export type Social = {
  instagram_username: string
  portfolio_url: string
  twitter_username: string
}

export type Badge = {
  title: string
  primary: boolean
  slug: string
  link: string
}

/* -------------------------------------------------------------------------- */

export type AutocompleteResponse = {
  fuzzy: AutocompleteResponseItem[]
  autocomplete: AutocompleteResponseItem[]
  did_you_mean: AutocompleteResponseItem[]
}

export type AutocompleteResponseItem = {
  query: string
  priority: number
}
/* -------------------------------------------------------------------------- */

export type ImageSearchResponse = {
  total: number
  total_pages: number
  results: ImageCardData[]
}

/* -------------------------------------------------------------------------- */
/* ------------------- API Response from get Single Image ------------------- */

export type ImageFullData = {
  id: string
  created_at: string
  updated_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  downloads: number
  likes: number
  liked_by_user: boolean
  public_domain: boolean
  description: string
  exif: Exif
  location: Location
  tags: Tag[]
  current_user_collections: CurrentUserCollection[]
  urls: Urls
  links: Links
  user: User
}

export type Exif = {
  make: string
  model: string
  name: string
  exposure_time: string
  aperture: string
  focal_length: string
  iso: number
}

export type Location = {
  city: string
  country: string
  position: Position
}

export type Position = {
  latitude: number
  longitude: number
}

export type Tag = {
  title: string
}

/* -------------------------------------------------------------------------- */
/* ------------------ API response from get list of Images ------------------ */

export type ImageCardData = {
  id: string
  created_at: string
  updated_at: string
  width: number
  height: number
  color: string
  blur_hash: string
  likes: number
  liked_by_user: boolean
  description: string
  user: User
  current_user_collections: CurrentUserCollection[]
  urls: Urls
  links: Links
}

export type User = {
  id: string
  username: string
  name: string
  portfolio_url: string
  bio: string
  location: string
  total_likes: number
  total_photos: number
  total_collections: number
  instagram_username: string
  twitter_username: string
  profile_image: ProfileImage
  links: UserLinks
}

export type ProfileImage = {
  small: string
  medium: string
  large: string
}

export type UserLinks = {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
}

export type CurrentUserCollection = {
  id: number
  title: string
  published_at: string
  last_collected_at: string
  updated_at: string
  cover_photo: any
  user: any
}

export type Urls = {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
}

export type Links = {
  self: string
  html: string
  download: string
  download_location: string
}
