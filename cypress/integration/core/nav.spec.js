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
  "/submit",
  "/submit/rules",
  "/about",
  "/privacy-policy",
  "/privacy-settings",
];
const navConfigMinimalUrls = [
  "/account",
  "/nav/menu",
  "/asdfasd",
  "/submit/draft",
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
    cy.get(element).contains("Menu");
    cy.get(element).contains("Submissions");
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
    expect($nav.text()).not.includes("Submissions");
    expect($nav.text()).not.includes("About");
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
  it("Opens Sections modal", () => {
    // refactored test for modal items
    const testModalSections = () => {
      const modal = "#modal-card";
      cy.get(modal)
        .should("exist")
        .contains("Sections");

      cy.get(modal).contains("Analog.Cafe");
      cy.get(modal).contains("Everything Film");
      cy.get(modal).contains("Stories, Essays, Opinions");
      cy.get(modal).contains("Letters & Editorials");
      cy.get(modal).contains("Collaborations");
      cy.get(modal).contains("Printable Guides & Articles");
    };

    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="NavBrandName"]').click();
    testModalSections();
    cy.get('[data-cy="CardHeaderClose"]').click();
  });

  it("Opens Menu modal", () => {
    const testModalMenu = () => {
      const modal = "#modal-card";
      cy.get(modal)
        .should("exist")
        .contains("Menu");

      cy.get(modal).contains("Search");
      cy.get(modal).contains("Your Account");
      cy.get(modal).contains("Submissions");
      cy.get(modal).contains("Composer App");
      cy.get(modal).contains("Rules");
      cy.get(modal).contains("Privacy");
      cy.get(modal).contains("Etsy Shop");

      cy.get('[data-cy="NavSearch"]')
        .click()
        .type("a");
      cy.get(modal).contains("Sections");
      cy.get(modal).contains("Printable Guides & Articles");
      cy.get(modal).contains("Everything Film");
      cy.get(modal).contains("Stories, Essays, Opinions");
      cy.get(modal).contains("Letters & Editorials");
      cy.get(modal).contains("Collaborations");
      cy.get('[data-cy="CardHeaderClose"]').click();
    };

    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="NavLinkMenu"]').click();
    testModalMenu();
  });
});
