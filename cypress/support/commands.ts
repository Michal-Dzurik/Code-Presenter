export {};

// @ts-ignore
Cypress.Commands.addAll({
    visitAndLogIn(url: string): void {
        window.localStorage.setItem(
            'user',
            '{"uid":"iNSGPoFMT9O1sUaxkJAo4kRQx6m2","email":"dummy.test.dzurikm@gmail.com","emailVerified":true,"displayName":"Testing Account","isAnonymous":false,"photoURL":"https://lh3.googleusercontent.com/a/ACg8ocInBqhhdfd1uuBSXRcKoW8Ix-X4sHScHGGq8FxJox2ezYEWgg=s96-c","providerData":[{"providerId":"google.com","uid":"115509019452036427542","displayName":"Testing Account","email":"dummy.test.dzurikm@gmail.com","phoneNumber":null,"photoURL":"https://lh3.googleusercontent.com/a/ACg8ocInBqhhdfd1uuBSXRcKoW8Ix-X4sHScHGGq8FxJox2ezYEWgg=s96-c"}],"stsTokenManager":{"refreshToken":"AMf-vBwvGkCZoZwtUStV1oRrrV4-5WsNjwzQeii7MblZ1_ykyd25f8VEzozjsgx9VzPG2e5iIQlZg0M19N1Rq8iXQ2D8cAp5plYa0d34vu400y0npsKF6Xchr_0G6DIIvyPn-kDnwdz1rjTam4CvCeLgxwrxpGlEs8FJugJelDtYaPNAEyRc-JPcAVNXRHS77LeKy7oF5e65LWXMZT6bgLZy-NN9znBVauJalestpw9G5SdQMPU32kFUGxz99abqMKaBJgT2GtioytXDt9bSfVEaoUsv-nE3CF_5kzZDzAd_Pn4TLsxwad2hHE-Yfgqzl8qD70rTQg8eExWA-AlgY1pGPjuTxEKApMpkxoOw73FCEQ8oFo0nGIwNHvzaMKn9zFBtmXCsUvW4C8GRMhzXXEo5pgCsUkVrXHaBx9ojOl38fgIPqlyTyfGhJ9xID_UBTEM0JN4Lkl-N9zlflxLvxlr5vEkHdOptNw","accessToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjkyODg2OGRjNDRlYTZhOThjODhiMzkzZDM2NDQ1MTM2NWViYjMwZDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVGVzdGluZyBBY2NvdW50IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0luQnFoaGRmZDF1dUJTWFJjS29XOEl4LVg0c0hTY0hHR3E4RnhKb3gyZXpZRVdnZz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jb2RlLXByZXNlbnRlci05YzkxYSIsImF1ZCI6ImNvZGUtcHJlc2VudGVyLTljOTFhIiwiYXV0aF90aW1lIjoxNzMyMDI1MzgyLCJ1c2VyX2lkIjoiaU5TR1BvRk1UOU8xc1VheGtKQW80a1JReDZtMiIsInN1YiI6ImlOU0dQb0ZNVDlPMXNVYXhrSkFvNGtSUXg2bTIiLCJpYXQiOjE3MzIwMjUzODIsImV4cCI6MTczMjAyODk4MiwiZW1haWwiOiJkdW1teS50ZXN0LmR6dXJpa21AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTU1MDkwMTk0NTIwMzY0Mjc1NDIiXSwiZW1haWwiOlsiZHVtbXkudGVzdC5kenVyaWttQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.nQW26F1H4HuXbOIrj3vyr07Kj6j9J7kr44JjmrHP-Gzp_lxVJQCr-xY6zL8Nt-PCDTwoVRqWr_J5EWef_mxr2uFqExmb3nNQo1vKFNq5UugGdk1qWN6cRq8TFF37zScTjsUKGTDM9Dqk_8enSrKLObyTfrO9-byWXhJgDqrnNKtKV9qFlOpQraWJIH_Zmka2rjf21nTMBSn-hGYvUwn5X1v0cVASa9DVJbO7kFv_eivF3A328LST2aTJNVdtW4JapUYO5duVyuJ5a3dkeAVgpVsiP-PxszyHOXDIpeZceeO1nAhQhc57z925HCjnpqzX6FRCf_vynDp_K8kSZcEDhw","expirationTime":1732028982481},"createdAt":"1731934969244","lastLoginAt":"1732025382489","apiKey":"AIzaSyA9gIak5owd6opu-XYX6wyxirt-1u0KAjk","appName":"[DEFAULT]"}'
        );
        cy.visit(url);
    },
    createCard(card: {
        heading: string;
        applicableAt: string;
        code: string;
        type: number;
        discount: string;
    }): void {
        // @ts-ignore
        cy.visitAndLogIn(Cypress.config('baseUrl') + '/editor');

        // Fill out the form
        cy.get('[data-testid="card-type-select"]').select(card.type.toString());
        cy.get('[data-testid="card-heading-input"]').type(card.heading);
        cy.get('[data-testid="card-code-input"]').type(card.code);
        cy.get('[data-testid="card-applicable-at-input"]').type(
            card.applicableAt
        );
        cy.get('[data-testid="card-discount-input"]').type(card.discount);
        cy.get('[data-testid="editor-submit-button"]').click();

        // Created successfully TODO: After implementing alert system, we will look for that
        cy.get('.card-view-button').should('be.visible');
    },
    cardIs(card: {
        heading: string;
        applicableAt: string;
        code: string;
        type: number;
        discount: string;
    }): void {
        cy.get('.card-heading')
            .should('be.visible')
            .and('contain', card.heading);
        cy.get('.card-code').should('be.visible').and('contain', card.code);
        cy.get('.card-discount')
            .should('be.visible')
            .and('contain', card.discount);
        cy.get('.card-applicable-at')
            .should('be.visible')
            .and('contain', card.applicableAt);
    },
});
