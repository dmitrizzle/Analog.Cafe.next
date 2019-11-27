import { DOMAIN } from "../../../constants/router/defaults";
import { ROUTE_LABELS } from "../../../core/components/pages/List/constants";

// batch testing on all core URLs
const urls = [
  "/",
  "/photo-essays",
  "/film-photography",
  "/editorials",
  "/collaborations",
  "/printables-and-downloads",
  "/write",
  "/tos",
  "/about",
  "/privacy-policy",
  "/privacy-settings",
];
const navConfigMinimalUrls = [
  "/account",
  "/nav/your-account",
  "/asdfasd",
  "/write/draft",
];
const navListUrls = [
  "/",
  "/photo-essays",
  "/film-photography",
  "/editorials",
  "/collaborations",
  "/printables-and-downloads",
];
const element = '[data-cy="Nav"]';

describe("'Nav' tests", () => {
  // refactored tests
  const featureTests = element => {
    cy.get(element).should("exist");
    cy.get(element).contains("Your Account");
    cy.get(element).contains("Explore");
    cy.get(element).contains("Write");
    cy.get(element).contains("Menu");
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
    expect($nav.text()).not.includes("Menu");
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

describe("NavBrandName tests", () => {
  // refactored tests
  const featureTests = (element, url) => {
    cy.get(element).should("exist");
    cy.get(element).contains(ROUTE_LABELS[url].title);
  };
  navListUrls.forEach(url => {
    it("Mounts Nav element on " + url, () => {
      cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + url);
      featureTests('[data-cy="NavBrandName"]', url);
    });
  });
});

describe("Nav modal tests", () => {
  it("Opens Explore modal", () => {
    // refactored test for modal items
    const testModalExplore = () => {
      const modal = "#modal-card";
      cy.get(modal)
        .should("exist")
        .contains("Menu");

      cy.get(modal).contains("Your Account");
      cy.get(modal).contains("Submissions");
      cy.get(modal).contains("Downloads");
    };

    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="NavLinkMenu"]').click();
    testModalExplore();
    cy.get('[data-cy="CardHeaderClose"]').click();
  });

  it("Opens Menu modal", () => {
    const testModalMenu = () => {
      const modal = "#modal-card";
      cy.get(modal)
        .should("exist")
        .contains("Explore");

      cy.get(modal).contains("Film, Photography");
      cy.get(modal).contains("Essays, Stories");
      cy.get(modal).contains("Letters, Editorials");
      // cy.get(modal).contains("Collaborations");
      cy.get(modal).contains("Downloads");

      cy.get('[data-cy="NavSearch"]')
        .click()
        .type("a");
      cy.get(modal).contains("Menu");
      cy.get(modal).contains("Submissions");
      cy.get(modal).contains("Your Account");
      cy.get(modal).contains("Composer App");
      cy.get(modal).contains("About");
      cy.get(modal).contains("Solo Projects");
      cy.get('[data-cy="CardHeaderClose"]').click();
    };

    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="NavLinkExplore"]').click();
    testModalMenu();
  });
});
