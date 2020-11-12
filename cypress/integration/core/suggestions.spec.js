import { DOMAIN } from "../../../constants/router/defaults";

describe("'Article Suggestions' tests", () => {
  const visitTestPage = () => {
    cy.visit(
      DOMAIN.PROTOCOL.TEST +
        DOMAIN.APP.TEST +
        "/r/a-beginners-guide-to-film-photography-zq0f"
    );
  };
  Cypress.Cookies.preserveOnce();

  it("Correctly links to author page", () => {
    visitTestPage();
    cy.scrollTo("bottom");
    cy.wait(300);
    cy.scrollTo("bottom");
    cy.wait(1000);

    const authorCardLinks = '[data-cy="Autor__CardWithDockets"]';
    cy.get(authorCardLinks).each(element => {
      cy.get(element).should("exist");
    });
    cy.get(authorCardLinks).eq(0).click();
    cy.get(`[data-cy="HeaderTitle"]`).should("not.have.text", "Not Listed");
  });
});
