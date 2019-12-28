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
    cy.get(element).contains("Menu");
    cy.get(element).contains("Front Page");
    cy.get(element).contains("About");
    cy.get(element).contains("Account");
    cy.get(element).contains("Privacy");
    cy.get(element).contains("Terms");
    cy.get(element).contains("Cookies");
    cy.get(element).contains("Disclaimer");
    cy.get(element).contains("AUP");
    cy.get(element).contains("Privacy Settings");
  };

  // batch testing on all core URLs
  [
    "/",
    "/photo-essays",
    "/film-photography",
    "/editorials",
    "/collaborations",
    "/apps-and-downloads",
    "/write",
    "/write/draft",
    "/tos",
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
