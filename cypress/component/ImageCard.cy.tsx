/// <reference types="cypress" />

import ImageDialog from "@/components/ImageDialog"
import { ImageCardData, ImageFullData } from "@/lib/types"

import mockPartialImageData from "../fixtures/partialImageData.json"
import mockImageFullData from "../fixtures/fullImageData.json"
import ImageCard from "@/components/ImageCard"

describe("ImageDialog.cy.tsx", () => {
  beforeEach(() => {
    // cy.intercept("GET", "https://api.unsplash.com/photos/*", {
    //   statusCode: 200,
    //   body: mockImageFullData as unknown as ImageFullData,
    // })

    cy.readFile("public/images/hero.jpg").then((image) => {
      cy.intercept("_next/image*", {
        statusCode: 200,
        headers: { "Content-Type": "image/jpg" },
        body: image.buffer,
      })
    })
  })

  it("mount Image Dialog", () => {
    cy.mount(<ImageCard imageData={mockPartialImageData as ImageCardData} />)
  })
})
