import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageCardData, ImageFullData, ProfileData } from "@/lib/types"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DownloadIcon,
  InfoIcon,
  InstagramIcon,
  Share2Icon,
  ThumbsUpIcon,
  TwitterIcon,
  UserIcon,
} from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { fetchSingleImage } from "@/lib/data/images"
import { fetchUserProfile } from "@/lib/data/users"
import { Skeleton } from "./ui/skeleton"
import { saveAs } from "file-saver"

interface ImageDialogProps {
  children: React.ReactNode
  partialImageData: ImageCardData
}

const Tag = ({ children }: { children: string }) => {
  return (
    <div className="bg-bg-light-tag dark:bg-bg-dark-tag text-text-light-500 dark:text-text-light-500 px-2 py-1 rounded-md">
      {children}
    </div>
  )
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  children,
  partialImageData,
}) => {
  const [fullImageData, setFullImageData] = useState<ImageFullData | null>(null)
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null)
  const [imageError, setImageError] = useState(false)
  const [isHighResImageLoaded, setIsHighResImageLoaded] = useState(false)

  // Fetch more image details and user profile
  useEffect(() => {
    const getFullImageData = async () => {
      const image = await fetchSingleImage(partialImageData.id)
      setFullImageData(image)
    }

    const getUserProfile = async () => {
      const profile = await fetchUserProfile(partialImageData.user.username)
      setUserProfile(profile)
    }
    getFullImageData()
    getUserProfile()
  }, [partialImageData.id, partialImageData.user.username])

  const downloadImage = async () => {
    saveAs(
      fullImageData?.urls.regular || partialImageData.urls.regular,
      fullImageData
        ? `${fullImageData?.user?.username}-${fullImageData?.id}.jpg`
        : "image.jpg"
    )
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-bg-light-card dark:bg-bg-dark-card border-none shadow-md rounded-md max-h-screen my-8 overflow-auto">
        <div className="relative rounded-t-md p-0 overflow-hidden">
          <Image
            height={fullImageData?.height}
            width={fullImageData?.width}
            src={
              imageError
                ? "images/image404.png"
                : fullImageData?.urls.full || partialImageData.urls.small
            }
            alt={fullImageData?.description || "alt"}
            onError={() => setImageError(true)}
            blurDataURL={partialImageData.urls.small}
          />
          <div className="absolute bottom-4 right-4 w-full flex justify-end items-center space-x-2">
            <Button
              variant={"outline"}
              className="border-bg-light-tag text-bg-light-tag border-2 font-bold bg-black bg-opacity-25"
            >
              <Share2Icon size={16} />
              Share
            </Button>
            <Button
              variant={"outline"}
              className="border-bg-light-tag text-bg-light-tag border-2 font-bold bg-black bg-opacity-25"
            >
              <InfoIcon size={16} />
              Info
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {/* Avatar and Download */}
          <div className="flex justify-between items-end">
            <div className="flex space-x-1 justify-start items-center py-1 max-w-[90%] overflow-hidden">
              <a href={partialImageData.user.links.html}>
                <Avatar>
                  <AvatarImage
                    src={partialImageData.user.profile_image.medium}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    <UserIcon className="text-text-light-500 dark:text-text-dark-500 text-lg" />
                  </AvatarFallback>
                </Avatar>
              </a>
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold text-xs">
                  {partialImageData.user.name}
                </h1>
                <a href={partialImageData.user.links.html}>
                  <h2 className="text-text-light-400 dark:text-text-dark-400 font-poppins italic font-semibold text-xs">
                    {partialImageData.user.username && "@"}
                    {partialImageData.user.username}
                  </h2>
                </a>
              </div>
            </div>
            {/* Download */}
            <div className="flex flex-col space-y-1">
              <Button
                onClick={downloadImage}
                className="bg-bg-light-success dark:bg-bg-dark-success font-bold text-white rounded-md py-2 px-4 sm:py-4 sm:px-12"
              >
                Download
              </Button>
              <div className="flex items-center justify-end space-x-2">
                <div className="flex justify-center items-end space-x-1">
                  <DownloadIcon
                    className="text-text-light-500 dark:text-text-dark-500"
                    size={16}
                  />
                  <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold text-xs">
                    {fullImageData?.downloads}
                  </h1>
                </div>
                <div className="flex justify-center items-end space-x-1">
                  <ThumbsUpIcon
                    className="text-text-light-500 dark:text-text-dark-500"
                    size={16}
                  />
                  <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold text-xs">
                    {partialImageData.likes}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* Socials */}
          <div className="flex justify-start items-center space-x-2">
            <Skeleton isLoaded={!!userProfile}>
              {userProfile?.instagram_username && (
                <Link
                  href={
                    "https://www.instagram.com/" +
                    userProfile.instagram_username
                  }
                  className="flex justify-center items-center space-x-1 font-poppins text-sm text-text-light-400 dark:text-text-dark-400"
                >
                  <InstagramIcon size={16} />
                  <p>{userProfile.instagram_username || "instagram"}</p>
                </Link>
              )}
            </Skeleton>
            <Skeleton isLoaded={!!userProfile}>
              {userProfile?.twitter_username && (
                <Link
                  href={"https://twitter.com/" + userProfile.twitter_username}
                  className="flex justify-center items-center space-x-1 font-poppins text-sm text-text-light-400 dark:text-text-dark-400"
                >
                  <TwitterIcon size={16} />
                  <p>{userProfile.twitter_username}</p>
                </Link>
              )}
            </Skeleton>
          </div>
          {/* Tags */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold">
              Related Tags
            </h1>
            <div className="flex gap-2 flex-wrap">
              {fullImageData ? (
                fullImageData?.tags.map((tag) => (
                  <Tag key={tag.title}>{tag.title}</Tag>
                ))
              ) : (
                <>
                  <Skeleton isLoaded={false}>
                    <Tag>Tag</Tag>
                  </Skeleton>
                  <Skeleton isLoaded={false}>
                    <Tag>Tag</Tag>
                  </Skeleton>
                  <Skeleton isLoaded={false}>
                    <Tag>Tag</Tag>
                  </Skeleton>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageDialog
