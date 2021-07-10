import { DOMAIN } from "../../../constants/router/defaults";

// refactored tests
const errorTests = element => {
  cy.get(element).should("exist");
  cy.get(element).should("contain", "Error: 404");
};

describe("404 tests", () => {
  // batch testing on all core URLs
  [
    "/is",
    "/author",
    "/submit/asdf",
    "/sign-in/asdf",
    "/features/asfd",
    "/_error",
    "/r",
    "/u",
    "/r/aasfhuiha1s8f",

    // test that 404 caches are being invalidated:
    "/afsd7887asfd8asfd",
    "/afsd7887asfd8asfd",
  ].forEach(url => {
    it("404 displayed correctly on " + url, () => {
      cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url, {
        failOnStatusCode: false,
      });
      errorTests('[data-cy="HeaderTitle"]');

      // test status code
      cy.request({
        url: DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url,
        failOnStatusCode: false,
      }).then(resp => {
        expect(resp.status).to.eq(404);
      });
    });
  });
});

describe("Soft 404 tests", () => {
  it("Error page displayed correctly on `/account/submission/asd87f84wrfshdiasdf`", () => {
    cy.visit(
      DOMAIN.PROTOCOL.TEST +
        DOMAIN.APP.TEST +
        "/account/submission/asd87f84wrfshdiasdf",
      {
        failOnStatusCode: false,
      }
    );
    cy.get('[data-cy="HeaderTitle"]').should("exist");
    cy.get('[data-cy="HeaderTitle"]').should("contain", "Error");

    // test status code
    cy.request({
      url:
        DOMAIN.PROTOCOL.TEST +
        DOMAIN.APP.TEST +
        "/account/submission/asd87f84wrfshdiasdf",
      failOnStatusCode: false,
    }).then(resp => {
      expect(resp.status).to.eq(200);
    });
  });
});

describe("User not listed tests", () => {
  it("Handles `user not listed` case correctly", () => {
    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + "/u/asjdfhiasudf99", {
      failOnStatusCode: false,
    });

    cy.get('[data-cy="HeaderTitle"]').should("exist");
    cy.get('[data-cy="HeaderTitle"]').should("contain", "Error: 404");

    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + "/u/not-listed", {
      failOnStatusCode: false,
    });

    cy.get('[data-cy="HeaderTitle"]').should("exist");
    cy.get('[data-cy="HeaderTitle"]').should("contain", "Not Listed");

    cy.request({
      url: DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + "/u/asjdfhiasudf99",
      failOnStatusCode: false,
    }).then(resp => {
      expect(resp.status).to.eq(404);
    });
  });
});
