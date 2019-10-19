import { TEST_DOMAIN } from "../../../constants/router/tests";

describe("'Features' horisontal poster slider tests", () => {
  // refactored tests
  const featureTests = element => {
    cy.get(element).should("exist");
    cy.get(element + " a").should("have.attr", "data-src");
    cy.get(element + " h4").should("exist");
  };

  // batch testing on all core URLs
  [
    "/",
    "/photo-essays",
    "/film-photography",
    "/editorials",
    "/collaborations",
    "/links-and-downloads",
  ].forEach(url => {
    it("Mounts elements on " + url, () => {
      cy.visit(TEST_DOMAIN + url);
      featureTests("#feature-wall");
    });
  });
});
