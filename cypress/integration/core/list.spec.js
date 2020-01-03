import { DOMAIN } from "../../../constants/router/defaults";

// refactored tests
const featureTests = element => {
  cy.get(element).should("exist");
  cy.get(element + " h4").should("exist");
  cy.get(element + " small").should("exist");
  cy.get(element + " label").should("exist");
  const link = element + " a";
  cy.get(link).should("have.attr", "href");
  cy.get(link)
    .eq(0)
    .click();
  cy.url().should("include", "/r/");
};

describe("'List' item tests", () => {
  // batch testing on all core URLs
  [
    "/",
    "/photo-essays",
    "/film-photography",
    "/editorials",
    "/collaborations",
    // "/apps-and-downloads",
  ].forEach(url => {
    it("Mounts elements on " + url, () => {
      cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url);
      featureTests('[data-cy="ListBlock"]');
    });
  });

  it("Can load next page dynamically on /", () => {
    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="LinkButton"]').click();
    cy.get('[data-cy="ListBlock"]')
      .find("a")
      .should("have.length.gt", 10);
  });
});

describe("User profile list tests", () => {
  const url = DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + "/u/dmitrizzle";
  it("Mounts list element", () => {
    featureTests('[data-cy="ListBlock"]');
  });
  it("Does not appear as 'Not Listed' for known author", () => {
    cy.visit(url);
    cy.get(`[data-cy="HeaderTitle"]`).should("not.have.text", "Not Listed");
  });
});
