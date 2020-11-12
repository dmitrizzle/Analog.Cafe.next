import { DOMAIN } from "../../../constants/router/defaults";

// batch testing on all core URLs
const urls = [
  "/",
  "/photo-essays",
  "/film-photography",
  "/editorials",
  "/collaborations",
  "/apps-and-downloads",
  "/write",
  "/tos",
  "/about",
  "/privacy-policy",
  "/privacy-tools",
];
const navConfigMinimalUrls = [
  "/account",
  "/nav/your-account",
  "/asdfasd",
  "/write/draft",
];

const element = '[data-cy="Nav"]';

describe("'Nav' tests", () => {
  // refactored tests
  const featureTests = element => {
    cy.get(element).should("exist");
    cy.get(element).contains("Sign In");
    cy.get(element).contains("Menu");
    cy.get(element).contains("Shop");
    cy.get(element).contains("About");
  };
  urls.forEach(url => {
    it("Mounts Nav element on " + url, () => {
      cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url);
      featureTests(element);
    });
  });
});

describe("'NavMinimal' tests", () => {
  const featureTests = element => {
    cy.get(element).should("exist");
    const $nav = Cypress.$(element);
    expect($nav.text()).not.includes("Write");
    expect($nav.text()).not.includes("Explore");
    // expect($nav.text()).not.includes("Menu");
  };
  navConfigMinimalUrls.forEach(url => {
    it("Mounts NavMinimal element on " + url, () => {
      cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url, {
        failOnStatusCode: false,
      });
      cy.wait(50).then(() => {
        featureTests(element);
      });
    });
  });
});

describe("Nav modal tests", () => {
  it("Opens Menu modal", () => {
    // refactored test for modal items
    const testModalMenu = () => {
      const modal = "#modal-card";
      cy.get(modal).should("exist").contains("Menu");

      cy.get(modal).contains("Submissions");
      cy.get(modal).contains("About");
      cy.get(modal).contains("Sign In");
    };

    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="NavLinkMenu"]').click();
    cy.wait(5000);
    testModalMenu();
    cy.get("body").type("{esc}");
  });

  it("Your Account", () => {
    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="NavLinkYourAccount"]').click();

    cy.get("aside header h3").contains("Sign In");
  });
});
