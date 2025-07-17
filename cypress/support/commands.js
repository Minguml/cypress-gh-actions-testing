/// <reference types="cypress" />

Cypress.Commands.add("setDesktopViewport", () => {
    cy.viewport(1600, 900);
});

Cypress.Commands.add("visitEnvironment", (env = "main") => {
    const url = Cypress.env("urls")[env];
    cy.visit(url);
});

Cypress.Commands.add(
    "interceptGetAPIWithEnv",
    (endpoint, fixture, env = "pro_trading", alias = "getApiCall") => {
        const envConfig = Cypress.env("urls")[env];
        const baseUrl = envConfig.api || envConfig.baseUrl;
        const endpointPath = Cypress.env("endpoints")[endpoint];

        cy.intercept("GET", `${baseUrl}${endpointPath}`, { fixture }).as(alias);
    }
);

Cypress.Commands.add(
    "interceptGetAPI",
    (endpoint, fixture, alias = "getApiCall") => {
        const apiBaseUrl = Cypress.env("urls").pro_trading.api;
        cy.intercept("GET", `${apiBaseUrl}${endpoint}`, { fixture }).as(alias);
    }
);

Cypress.Commands.add(
    "interceptPostAPI",
    (endpoint, fixture, alias = "postApiCall") => {
        const apiBaseUrl = Cypress.env("urls").pro_trading.api;

        // If fixture is provided, use it; otherwise use a custom handler
        if (fixture) {
            cy.intercept("POST", `${apiBaseUrl}${endpoint}`, { fixture }).as(
                alias
            );
        } else {
            cy.intercept("POST", `${apiBaseUrl}${endpoint}`).as(alias);
        }
    }
);

Cypress.Commands.add("loginToProTrading", (username, password) => {
    // Use provided credentials or fall back to environment variables
    const user = username || Cypress.env("username");
    const pass = password || Cypress.env("password");

    cy.get('input[name="username"]').type(user);
    cy.get('input[name="password"]').type(pass);
    cy.get('button[type="submit"]').click();

    // Verify login success
    cy.url().should("not.contain", "login");
});

Cypress.Commands.add("stubOTPHandleWithInfiniteWait", (alias = "otpHandle") => {
    // Use the updated interceptPostAPI without fixture, then modify the intercept
    const apiBaseUrl = Cypress.env("urls").pro_trading.api;
    cy.intercept("POST", `${apiBaseUrl}/otp/handle`, (req) => {
        // Never resolve the request - simulates infinite waiting
        req.reply(() => {
            return new Promise(() => {
                // This promise never resolves, causing infinite wait
            });
        });
    }).as(alias);
});
