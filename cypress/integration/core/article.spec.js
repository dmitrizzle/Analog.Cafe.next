import { DOMAIN } from "../../../constants/router/defaults";

describe("'Article' tests", () => {
  const visitTestPage = () => {
    cy.visit(
      DOMAIN.PROTOCOL.TEST +
        DOMAIN.APP.TEST +
        "/r/a-beginners-guide-to-film-photography-zq0f"
    );
  };
  const title = "A Beginner’s Guide to Film Photography";

  it("Has all ArticleNav items", () => {
    visitTestPage();
    const subNav = '[data-cy="ArticleNav"]';
    cy.get(subNav).contains("Bookmark");
    cy.get(subNav).contains("Share");
  });
  it("Has meta title", () => {
    visitTestPage();
    cy.title().should("include", title);
  });
  it("Has correct header content", () => {
    visitTestPage();
    cy.get("header h1").should("exist").contains(title);
    cy.get("header em").should("exist").contains("47 min read by Dmitri");
  });

  it("Has images with modal actions", () => {
    visitTestPage();

    // modal opens up
    cy.get("main section figure").eq(0).click();
    const modal = "#modal-card";
    cy.wait(1000);
    cy.get(modal + " a")
      .should("exist")
      .contains("ⓒ");

    // verify that author CTA button exists on fir page load
    // cy.get(modal + " a")
    //   .should("exist")
    //   .contains("Bookmark");

    // modal closes on escape
    cy.wait(1000);
    cy.get("body").type("{esc}");
    cy.wait(300);
    cy.get("#modal-overlay").should("have.css", "display", "none");

    // full-width image is full-width
    cy.viewport(1000, 660);
    expect(Cypress.$("main section figure").eq(0).width()).to.be.equal(1000);

    // small image is of the right size
    expect(Cypress.$("main section figure").eq(1).width()).to.be.equal(580);

    // small image has a caption
    cy.get("main section figure figcaption").should("exist");
    cy.get("main section figure figcaption > div").should(
      "have.css",
      "font-size",
      "14.4px"
    );
    cy.get("main section figure figcaption > div").should(
      "have.css",
      "font-style",
      "italic"
    );
  });
  it("Has correct typography", () => {
    cy.get("article section p").should(
      "have.css",
      "font-family",
      "LoraVariable, Georgia, serif"
    );
    cy.get("article section p").should("have.css", "font-size", "18px");
    // cy.get("article section p").should("have.css", "color", "rgb(44, 44, 44)");
    cy.get("article section p").should("have.css", "letter-spacing", "0.45px");
    cy.get("article section p strong")
      .should("have.css", "font-weight")
      .and("match", /bold|700/);

    cy.get("article section h3").should("have.css", "font-weight", "600");
    cy.get("article section h3").should("have.css", "font-size", "36px");
    cy.get("article section h3").should(
      "have.css",
      "font-family",
      '"Exo 2variable", Arial, sans-serif'
    );
  });
  it.skip("Has quotes with correct styles", () => {});
  it.skip("Has correct Suggestions content", () => {});
});
