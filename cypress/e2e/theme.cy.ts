/// <reference types="cypress" />

describe("theme", () => {
  it("should change theme to opposite mode", () => {
    cy.visit("http://localhost:3000")

    let initialTheme = "light"
    cy.get("html")
      .invoke("hasClass", "dark")
      .then((hasClass) => {
        return hasClass ? (initialTheme = "dark") : (initialTheme = "light")
      })

    let themeSwitch = cy.get(`[data-test-id="theme-switch"]`)
    themeSwitch.click()

    cy.get("html").should(
      "have.class",
      initialTheme === "dark" ? "light" : "dark"
    )
  })
})
