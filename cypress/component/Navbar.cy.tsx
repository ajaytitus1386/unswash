/// <reference types="cypress" />

import Navbar from "@/components/Navbar"

describe("Navbar.cy.tsx", () => {
  it("mount Navbar", () => {
    cy.mount(
        <Navbar />
    )
  })
})
