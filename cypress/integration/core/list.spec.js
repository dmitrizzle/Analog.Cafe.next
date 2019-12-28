import { DOMAIN } from "../../../constants/router/defaults";

describe("'List' item tests", () => {
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
