import "cypress-real-events/support";

describe("Pro Trading Platform Tests", () => {
    beforeEach(() => {
        cy.setDesktopViewport();
    });

    it("should visit pro-trading platform and login", () => {
        // Visit the pro-trading platform
        const proTradingUrl = Cypress.env("urls").pro_trading.baseUrl;
        cy.visit(proTradingUrl);

        // Verify the page loads successfully
        cy.url().should("include", "uat-pro-trading.phs.vn");

        // When redirected to login, use custom command
        cy.loginToProTrading();

        // Optional: Add assertions to verify successful login
        cy.url().should("not.contain", "login");
    });

    it("should click buy button and stub OTP API call", () => {
        // Set up API stub first
        cy.stubOTPHandleWithInfiniteWait("otpHandleRequest");

        // Visit and login first
        const proTradingUrl = Cypress.env("urls").pro_trading.baseUrl;
        cy.visit(proTradingUrl);
        cy.loginToProTrading();
        cy.url().should("not.contain", "login");
        cy.get('button[type="button"]').contains("1,000").click();
        cy.wait(2000);
        cy.get('button[type="submit"]').contains("Mua").click();
        cy.get('div[role="dialog"][data-state="open"]').should("be.visible");
        cy.get("button").contains("Confirm").click();

        // The OTP API request will now wait indefinitely
        // Add assertions to verify loading state while API is pending
    });

    // it("should visit pro-trading using visitEnvironment command", () => {
    //     // Alternative approach using custom command
    //     // Note: This would need the visitEnvironment command updated to handle nested URLs
    //     const proTradingUrl = Cypress.env("urls").pro_trading.baseUrl;
    //     cy.visit(proTradingUrl);

    //     // Verify successful navigation
    //     cy.url().should("contain", "customize?layout=classic");
    // });

    // it("should login using cy.request for session", () => {
    //     // Method 3: Use cy.request to authenticate and get session cookies
    //     cy.request({
    //         method: "POST",
    //         url: `${Cypress.env("urls").pro_trading.api}auth/login`,
    //         body: {
    //             username: "your-username",
    //             password: "your-password",
    //         },
    //     }).then((response) => {
    //         // Extract cookies or tokens from response
    //         const authToken = response.body.token;
    //         cy.setCookie("authToken", authToken);

    //         // Now visit the page with authentication
    //         const proTradingUrl = Cypress.env("urls").pro_trading.baseUrl;
    //         cy.visit(proTradingUrl);
    //     });
    // });
});
