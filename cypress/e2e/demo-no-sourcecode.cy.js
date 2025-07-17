// import "cypress-real-events/support";

// //Fundamentals - visit, get, contains, should - basics, no custom commands, only using visit, get, contains and should
// describe("Fundamentals Test - Contain, Should exist", () => {
//     it("should display the top 10 warrants section in Vietnamese", () => {
//         cy.visit("http://localhost:5173/");
//         cy.get("h1, h2, h3, h4, h5, h6")
//             .contains("Top 10 Chứng Quyền Trên Thị Trường")
//             .should("exist");
//     });
// });

// describe("Hover Interactions Test", () => {
//     it("should hover over the 'Công cụ phân tích' element", () => {
//         cy.viewport(1280, 800);
//         cy.visit("http://localhost:5173/");

//         // Find the element with "Công cụ phân tích" text and hover over it
//         cy.contains("Công cụ phân tích")
//             .should("exist")
//             .should("be.visible")
//             .realHover();

//         // After hovering, find and click the "Bộ lọc" element
//         cy.contains("Bộ lọc").should("exist").should("be.visible").click();

//         // Verify that the URL redirects to "/cw-screener"
//         cy.url().should("include", "/cw-screener");
//     });
// });

// describe("API Stubbing Test - No Source Code", () => {
//     it("should stub the top 10 warrants API and use fake data", () => {
//         // Stub the API call with fake data
//         cy.intercept("GET", "http://192.168.66.23:8000/api/cw/top-10-warrant", {
//             fixture: "fake-table.json",
//         }).as("getTopWarrants");

//         cy.viewport(1280, 800);
//         cy.visit("/");

//         // Wait for the API call to complete
//         cy.wait("@getTopWarrants");

//         // Verify that the fake data is loaded by checking for one of the symbols
//         cy.contains("FAKE0001").should("exist");
//     });
// });

// describe("API Stubbing Test - Using Custom Commands", () => {
//     // Use custom command and beforeEach for viewport
//     beforeEach(() => {
//         cy.setDesktopViewport();
//         cy.visit("/");
//     });
//     it("should stub the top 10 warrants API using custom interceptGetAPI command", () => {
//         // Use custom command to stub the GET API call
//         cy.interceptGetAPI(
//             "/cw/top-10-warrant",
//             "fake-table.json",
//             "getTopWarrants"
//         );

//         // Wait for the API call to complete
//         cy.wait("@getTopWarrants");

//         // Verify that the fake data is loaded by checking for one of the symbols
//         cy.contains("FAKE0001").should("exist");
//     });
// });
