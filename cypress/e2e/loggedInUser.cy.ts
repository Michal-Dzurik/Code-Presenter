export {};

declare global {
    namespace Cypress {
        interface Chainable {
            visitAndLogIn(url: string): Chainable;
        }
    }
}

describe('Logged in user', () => {

    context('Authed actions', () => {
        it('should log in', () => {
            cy.visitAndLogIn('http://localhost:3000/');

            // When the dropdown is displayed we are logged in
            cy.get('#profile-dropdown').should('be.visible');
        });

        it('should create a card and view it', () => {
            cy.visitAndLogIn('http://localhost:3000/editor');

            // Fill out the form
            cy.get('#card-type-select').select('1');
            cy.get('#card-heading-input').type('Test');
            cy.get('#card-code-input').type('Test');
            cy.get('#card-applicable-at-input').type('Test');
            cy.get('#card-discount-input').type('Test');
            cy.get('#editor-submit-button').click();

            // Created successfully TODO: After implementing alert system, we will look for that
            cy.get('.card-view-button').should('be.visible');

            // We can see card with all it's values
            cy.get('.card-heading').should('be.visible').and('contain', 'Test');
            cy.get('.card-code').should('be.visible').and('contain', 'Test');
            cy.get('.card-discount').should('be.visible').and('contain', 'Test');
            cy.get('.card-applicable-at').should('be.visible').and('contain', 'Test');
        });

        it('should log out', () => {
            cy.visitAndLogIn('http://localhost:3000/');

            // log out
            cy.get('#profile-dropdown').click();
            cy.get('#logout-link').click();

            // Confirm log out
            cy.get('#login-button').should('be.visible');
        });
    });

});
