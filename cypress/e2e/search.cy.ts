/// <reference types="cypress" />

describe("search bar in hero component", () => {
  it("should search for cats using click search button action", () => {
    cy.visit("http://localhost:3000")

    let searchInput = cy.get("[data-test-id='search-input-hero']")
    searchInput.type("cats")

    let searchForm = cy.get('[data-test-id="search-form-hero"]')

    let searchButton = searchForm.find('[data-test-id="search-button-hero"]')
    searchButton.click()

    cy.url().should("include", "/?search=cats")
  })

  it("should search for cats using submit form action", () => {
    cy.visit("http://localhost:3000")

    let searchInput = cy.get("[data-test-id='search-input-hero']")
    searchInput.type("cats")

    let searchForm = cy.get('[data-test-id="search-form-hero"]')
    searchForm.submit().then(() => {
      cy.url().should("include", "/?search=cats")
    })
  })

  it("should show suggestions when typing cats in searchbar", () => {
    cy.visit("http://localhost:3000")

    let searchInput = cy.get("[data-test-id='search-input-hero']")
    searchInput.type("cats")

    cy.get('[data-test-id="search-suggestions-hero"]').should("exist")
  })
})
