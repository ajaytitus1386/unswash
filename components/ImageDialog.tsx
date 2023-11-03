import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ImageCardData, ImageFullData, ProfileData } from "@/lib/types"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DownloadIcon,
  FacebookIcon,
  InfoIcon,
  InstagramIcon,
  LinkIcon,
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
import { toast } from "./ui/use-toast"
import { FacebookShareButton, TwitterShareButton } from "react-share"

import { cn } from "@/lib/utils"

interface ImageDialogProps {
  children: React.ReactNode
  partialImageData: ImageCardData
}

interface ShareDialogProps {
  fullImageData?: ImageFullData
  partialImageData: ImageCardData
}

interface InfoToggleProps {
  toggleInfo: () => void
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  partialImageData,
  fullImageData,
}) => {
  const imageUrl = fullImageData?.links?.html || partialImageData.links?.html
  const copyToClipboard = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(imageUrl)
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste the link anywhere.",
      })
    } else {
      toast({
        title: "Uh oh, we couldn't copy the link!",
        description: "Please try again later.",
      })
    }
  }
  return (
    <Dialog>
      <DialogTrigger
        // onClick={copyToClipboard}
        className="flex items-center justify-center px-2 py-1 rounded-md space-x-1 border-bg-light-tag text-bg-light-tag border-2 font-bold bg-black bg-opacity-0 hover:bg-opacity-25"
      >
        <Share2Icon size={16} />
        <p>Share</p>
      </DialogTrigger>
      <DialogContent className="flex flex-col px-4 py-2 gap-1">
        {/* Social Media Apps */}
        <div className="flex items-center justify-between space-x-1 mx-auto">
          <FacebookShareButton url={imageUrl}>
            <FacebookIcon />
          </FacebookShareButton>
          <TwitterShareButton url={imageUrl}>
            <TwitterIcon />
          </TwitterShareButton>
        </div>
        {/* Link */}
        <div>
          <div className="flex items-center justify-center space-x-1">
            <input
              type="text"
              className="w-auto cursor-copy select-all bg-bg-light-input dark:bg-bg-dark-input text-text-light-500 dark:text-text-dark-500 rounded-md py-2 px-4"
              value={
                "https://unsplash.com/photos/" +
                (fullImageData?.id || partialImageData.id)
              }
              readOnly
            />
            <Button
              variant={"ghost"}
              onClick={copyToClipboard}
              className="font-bold rounded-md py-2 px-4 sm:py-4 sm:px-12"
            >
              <LinkIcon
                className="text-text-light-500 dark:text-text-dark-500"
                size={16}
              />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const InfoToggle: React.FC<InfoToggleProps> = ({ toggleInfo }) => {
  return (
    <button
      onClick={toggleInfo}
      className="flex items-center justify-center px-2 py-1 rounded-md space-x-1 border-bg-light-tag text-bg-light-tag border-2 font-bold bg-black bg-opacity-0 hover:bg-opacity-25"
    >
      <InfoIcon size={16} />
      <p>Info</p>
    </button>
  )
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
  const [showInfo, setShowInfo] = useState(false)
  const [isHighResImageLoaded, setIsHighResImageLoaded] = useState(false)

  // Fetch more image details and user profile
  useEffect(() => {
    const getFullImageData = async () => {
      const image = await fetchSingleImage(partialImageData.id)
      if (!image) return
      setFullImageData(image)
    }

    const getUserProfile = async () => {
      const profile = await fetchUserProfile(partialImageData.user.username)
      if (!profile) return
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

  const toggleInfo = () => {
    setShowInfo(!showInfo)
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
                ? "/images/image404.png"
                : fullImageData?.urls.full || partialImageData.urls.small
            }
            alt={fullImageData?.description || "alt"}
            onError={() => setImageError(true)}
            blurDataURL={partialImageData.urls.small}
          />
          {showInfo && (
            <div
              className={cn(
                "absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col justify-center items-center space-y-1 px-4 pb-8 overflow-y-auto animate-fade-in"
              )}
            >
              <h1 className="text-text-light-400 dark:text-text-dark-400 font-bold">
                Description
              </h1>
              <p className="text-text-light-400 dark:text-text-dark-400 font-poppins italic font-semibold text-xs">
                {fullImageData?.description || partialImageData.description}
              </p>
            </div>
          )}
          <div className="absolute bottom-4 right-4 w-full flex justify-end items-center space-x-2">
            <ShareDialog
              fullImageData={fullImageData || undefined}
              partialImageData={partialImageData}
            />
            <InfoToggle toggleInfo={toggleInfo} />
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
