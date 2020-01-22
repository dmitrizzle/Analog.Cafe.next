import { DOMAIN } from "../../../constants/router/defaults";
import { ROUTE_LABELS } from "../../../core/components/pages/List/constants";

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
  "/apps-and-downloads",
];
const element = '[data-cy="Nav"]';

describe("'Nav' tests", () => {
  // refactored tests
  const featureTests = element => {
    cy.get(element).should("exist");
    cy.get(element).contains("Your Account");
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
  it("Opens Menu modal", () => {
    // refactored test for modal items
    const testModalMenu = () => {
      const modal = "#modal-card";
      cy.get(modal)
        .should("exist")
        .contains("Menu");

      cy.get(modal).contains("Front Page");
      cy.get(modal).contains("Submissions");
      cy.get(modal).contains("Apps & Downloads");
      cy.get(modal).contains("Film, Photography");
      cy.get(modal).contains("Essays, Stories");
      cy.get(modal).contains("Letters, Editorials");
    };

    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.wait(5000);
    cy.get('[data-cy="NavLinkMenu"]').click();
    testModalMenu();
    cy.get('[data-cy="CardHeaderClose"]').click();
  });

  it("Your Account", () => {
    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST);
    cy.get('[data-cy="NavLinkYourAccount"]').click();

    cy.get("h1").contains("Sign In");
  });
});
