export {};

describe('User with no authentication', () => {

    context('All routes can load without user logged in', () => {
        it('should load Home', () => {
            cy.visit('http://localhost:3000');

            cy.get('h1').should('contain.text', 'Welcome in Code Presenter');
        });

        it('should load 404', () => {
            cy.visit('http://localhost:3000/404');

            cy.get('#404').should('have.text', '4😕4');
        });

        it("shouldn't load editor", () => {
            cy.visit('http://localhost:3000/editor');

            cy.get('#404').should('have.text', '4😕4');
        });

        it("shouldn't load my codes", () => {
            cy.visit('http://localhost:3000/my-codes');

            cy.get('#404').should('have.text', '4😕4');
        });
    });

});
