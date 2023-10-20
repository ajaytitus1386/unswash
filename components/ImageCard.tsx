"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { ImageCardData } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ThumbsUpIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import ImageDialog from "./ImageDialog"

interface ImageCardProps {
  imageData: ImageCardData
}

const ImageCard: React.FC<ImageCardProps> = ({ imageData }) => {
  const [imageError, setImageError] = useState(false)
  return (
    // Image Popup Wrapper
    <ImageDialog partialImageData={imageData}>
      <Card className="bg-bg-light-card dark:bg-bg-dark-card border-none shadow-md rounded-md my-4 sm:my-8">
        {/* Image */}
        <CardContent className="rounded-t-md p-0 overflow-hidden">
          <Image
            height={imageData.height}
            width={imageData.width}
            src={imageError ? "images/image404.png" : imageData.urls.small}
            alt={imageData.description || "alt"}
            onError={() => setImageError(true)}
          />
        </CardContent>
        {/* User Details */}
        <CardFooter className="flex flex-row justify-between items-center px-2 py-1">
          <div className="flex space-x-1 justify-start items-center py-1 max-w-[90%] overflow-hidden">
            <a href={imageData.user.links.html}>
              <Avatar>
                <AvatarImage
                  src={imageData.user.profile_image.medium}
                  alt="avatar"
                />
                <AvatarFallback>
                  <UserIcon className="text-text-light-500 dark:text-text-dark-500 text-lg" />
                </AvatarFallback>
              </Avatar>
            </a>
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold text-xs">
                {imageData.user.name}
              </h1>
              <a href={imageData.user.links.html}>
                <h2 className="text-text-light-400 dark:text-text-dark-400 font-poppins italic font-semibold text-xs">
                  {imageData.user.username && "@"}
                  {imageData.user.username}
                </h2>
              </a>
            </div>
          </div>
          {/* Likes */}
          <div className="flex justify-center items-end space-x-1">
            <ThumbsUpIcon
              className="text-text-light-500 dark:text-text-dark-500"
              size={16}
            />
            <h1 className="text-text-light-500 dark:text-text-dark-500 font-bold text-xs">
              {imageData.likes}
            </h1>
          </div>
        </CardFooter>
      </Card>
    </ImageDialog>
  )
}

export default ImageCard
