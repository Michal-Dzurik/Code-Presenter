export {};

describe('User with no authentication', () => {
    var BASE_URL: string;

    before(() => {
        // @ts-ignore
        BASE_URL = Cypress.config('baseUrl');
    });

    it('should load Home', () => {
        cy.visit(BASE_URL);

        cy.get('[data-testid="home-heading"]').should(
            'contain.text',
            'Welcome in Code Presenter'
        );
    });

    it('should load 404', () => {
        cy.visit(BASE_URL + '/404');

        cy.get('[data-testid="404"]').should('have.text', '4😕4');
    });

    it("shouldn't load editor", () => {
        cy.visit(BASE_URL + '/editor');

        cy.get('[data-testid="404"]').should('have.text', '4😕4');
    });

    it("shouldn't load my codes", () => {
        cy.visit(BASE_URL + '/my-codes');

        cy.get('[data-testid="404"]').should('have.text', '4😕4');
    });
});
