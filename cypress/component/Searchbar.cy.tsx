/// <reference types="cypress" />

import SearchBar from "@/components/Searchbar"
import { mount } from "cypress/react18"
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime"

// Cypress.Commands.overwrite("mount", (component, options) => {
//   const router = {
//     route: "/",
//     pathname: "/",
//     query: {},
//     asPath: "/",
//     basePath: "",
//     back: cy.stub().as("router:back"),
//     forward: cy.stub().as("router:forward"),
//     push: cy.stub().as("router:push"),
//     reload: cy.stub().as("router:reload"),
//     replace: cy.stub().as("router:replace"),
//     isReady: true,
//     ...(options?.router || {}),
//   }

//   return mount(
//     <RouterContext.Provider value={router}>{component}</RouterContext.Provider>,
//     options
//   )
// })

import * as NextRouter from "next/router"

describe("Searchbar.cy.tsx", () => {
  ;["hero", "navbar"].forEach((variant) => {
    beforeEach(() => {
      const pathname = "some-path"
      const push = cy.stub()
      cy.stub(NextRouter, "useRouter").returns({ pathname, push })
      //   cy.mount(<SearchBar variant={variant as "hero" | "navbar"} />)
      cy.mount(<SearchBar variant={variant as "hero" | "navbar"} />)
    })

    it(`should show suggestions when typing cats in searchbar in ${variant}`, () => {
      let searchInput = cy.get(`[data-test-id='search-input-${variant}']`)
      searchInput.type("cats")

      cy.get(`[data-test-id="search-suggestions-${variant}"]`).should("exist")
    })
  })
})
