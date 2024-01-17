/// <reference types="cypress" />

import Navbar from "@/components/Navbar"
import MockRouter from "../utils/router"

describe("Navbar.cy.tsx", () => {
  it("mount Navbar", () => {
    cy.mount(
      <MockRouter>
        <Navbar />
      </MockRouter>
    )
  })
})
