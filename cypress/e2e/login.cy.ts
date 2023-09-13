///<reference types="cypress" />

//Dependent on whether or not the tes is run Local or in Prod the pathname will be different
const isLocal = Cypress.config('baseUrl')?.includes('local')
const pageUrl = isLocal ? '/inventory.html' : '/?/inventory.html'
beforeEach(() => {


  cy.session('user session', () => {
    cy.log('**log in**')
    cy.visit('/',{
      onBeforeLoad(win) {
        // @ts-ignore
        delete win.navigator.__proto__.serviceWorker
      },
    })
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.location('pathname').should('equal', '/inventory.html')
  })
  cy.visit(pageUrl,{
      onBeforeLoad(win) {
        // @ts-ignore
        delete win.navigator.__proto__.serviceWorker
      },
    })
})

it('visits the store', () => {
    cy.get('.inventory_list')
        .should('be.visible')
        .find('.inventory_item')
        .should('have.length.greaterThan', 3)

  })