import { DOMAIN } from "../../../constants/router/defaults";

describe("'Footer' tests", () => {
  // refactored tests
  const featureTests = element => {
    cy.scrollTo("bottom");
    cy.wait(300);
    cy.scrollTo("bottom");
    cy.wait(1000);
    cy.get(element).should("exist");
    cy.get(element).contains("Submissions");
    cy.get(element).contains("Explore");
    cy.get(element).contains("Homepage");
    cy.get(element).contains("About");
    cy.get(element).contains("Explore");
    cy.get(element).contains("Twitter");
    cy.get(element).contains("Feedly");
    cy.get(element).contains("Instagram");
    cy.get(element).contains("Account");
  };

  // batch testing on all core URLs
  [
    "/",
    "/photo-essays",
    "/film-photography",
    "/editorials",
    "/collaborations",
    "/printables-and-downloads",
    "/submit",
    "/submit/draft",
    "/submit/rules",
    "/about",
    "/privacy-policy",
    "/privacy-settings",
  ].forEach(url => {
    it("Mounts elements on " + url, () => {
      cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url);
      featureTests('[data-cy="Footer"]');
    });
  });
});
