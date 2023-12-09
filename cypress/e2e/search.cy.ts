/// <reference types="cypress" />

describe("search bar", () => {
  // Two distinct components that use a search bar
  // Each has a data-test-id that ends with their respective component name
  ;["hero", "navbar"].forEach((component) => {
    it(`should search for cats in ${component} using click search button action`, () => {
      cy.visit("http://localhost:3000")

      let searchInput = cy.get(`[data-test-id='search-input-${component}']`)
      searchInput.type("cats")

      let searchForm = cy.get(`[data-test-id="search-form-${component}"]`)

      let searchButton = searchForm.find(
        `[data-test-id="search-button-${component}"]`
      )
      searchButton.click()

      cy.url().should("include", "/?search=cats")
    })

    it(`should search for cats in ${component} using submit form action`, () => {
      cy.visit("http://localhost:3000")

      let searchInput = cy.get(`[data-test-id='search-input-${component}']`)
      searchInput.type("cats")

      let searchForm = cy.get(`[data-test-id="search-form-${component}"]`)
      searchForm.submit().then(() => {
        cy.url().should("include", "/?search=cats")
      })
    })

    it(`should show suggestions when typing cats in searchbar in ${component}`, () => {
      cy.visit("http://localhost:3000")

      let searchInput = cy.get(`[data-test-id='search-input-${component}']`)
      searchInput.type("cats")

      cy.get(`[data-test-id="search-suggestions-${component}"]`).should("exist")
    })
  })
})
