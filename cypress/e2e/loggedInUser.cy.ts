export {};

declare global {
    namespace Cypress {
        interface Chainable {
            visitAndLogIn(url: string): Chainable;
            createCard(card: {
                heading: string;
                applicableAt: string;
                code: string;
                type: number;
                discount: string;
            }): void;
            cardIs(card: {
                heading: string;
                applicableAt: string;
                code: string;
                type: number;
                discount: string;
            }): void;
            on(event: string, callback: () => boolean): void
        }
    }
}

describe('Logged in user', () => {
    var BASE_URL: string;
    var TEST_CARD: {
        heading: string;
        applicableAt: string;
        code: string;
        type: number;
        discount: string;
    };

    before(() => {
        // @ts-ignore
        BASE_URL = Cypress.config('baseUrl');
        TEST_CARD = {
            heading: 'test',
            applicableAt: 'test',
            code: 'test',
            discount: 'test',
            type: 1,
        };
    });

    it('should log in', () => {
        cy.visitAndLogIn(BASE_URL);

        // When the dropdown is displayed we are logged in
        cy.get('[data-testid="profile-dropdown"]').should('be.visible');
    });

    it('should create a card and delete it', () => {
        cy.createCard(TEST_CARD);

        cy.get('.card-delete-button').click();
        cy.on('window:confirm', () => true);

        cy.get('[data-testid="card-type-select"]').should(
            'have.value',
            null
        );
    });

    it('should be able to delete the card from editor', () => {
        cy.createCard(TEST_CARD);

        cy.get('.card-view-button').invoke('removeAttr', 'target').click();

        cy.cardIs(TEST_CARD);

        cy.visit(BASE_URL + '/my-codes');

        // Delete the card
        cy.get('.card-delete-button').click();
        cy.on('window:confirm', () => true);

        cy.get('[data-testid="no-cards"]').should(
            'contain.text',
            'Nothing :\\'
        );
    });

    it('should log out', () => {
        cy.visitAndLogIn(BASE_URL);

        // log out
        cy.get('[data-testid="profile-dropdown"]').click();
        cy.get('[data-testid="logout-link"]').click();

        // Confirm log out
        cy.get('[data-testid="login-button"]').should('be.visible');
    });
});
