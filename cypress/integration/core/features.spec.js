import { DOMAIN } from "../../../constants/router/defaults";

describe("'Features' horisontal poster slider tests", () => {
  // refactored tests
  const featureTests = element => {
    cy.get(element).should("exist");
    cy.get(element + " h4").should("exist");
    const link = element + " a";
    cy.get(link).should("have.attr", "style");
    cy.get(link).should("have.attr", "href");
    cy.get(link)
      .eq(0)
      .click();
    cy.wait(1000);
    // cy.url().should("include", "/r/");
  };

  // batch testing on all core URLs
  [
    "/",
    "/photo-essays",
    "/film-photography",
    "/editorials",
    "/collaborations",
    "/apps-and-downloads",
  ].forEach(url => {
    it("Mounts elements on " + url, () => {
      cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url);
      featureTests("#feature-wall");
    });
  });
});
