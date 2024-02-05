/// <reference types="cypress" />

describe("index page", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.unsplash.com/photos*", {
      fixture: "images.json",
    }).as("getPhotos")
  })

  it("should load 10 images on landing page", () => {
    cy.visit("http://localhost:3000")

    cy.wait("@getPhotos").its("response.statusCode").should("eq", 200)

    let masonGrid = cy.get('[data-test-id="mason-grid"]')

    masonGrid.children().should("have.length", 10)
  })

  it("should paginate the grid on scroll down", () => {
    cy.visit("http://localhost:3000")

    cy.wait("@getPhotos").its("response.statusCode").should("eq", 200)

    let masonGrid = cy.get('[data-test-id="mason-grid"]')

    let noOfImages = masonGrid.children().its("length")

    // cy.window().scrollTo("bottom")

    let newNoOfImages = masonGrid.children().its("length")
    newNoOfImages.should("be.gt", noOfImages)
  })
})
