import { DOMAIN } from "../../../constants/router/defaults";

describe("'Composer' tests", () => {
  const visitTestPage = () => {
    cy.visit(DOMAIN.PROTOCOL.TEST + DOMAIN.APP.TEST + "/write/draft");
  };

  it("Has all SubNav items", () => {
    visitTestPage();
    const subNav = '[data-cy="ComposerNav"]';
    cy.get(subNav).contains("Saved");
    cy.get(subNav).contains("Help");
    cy.get(subNav).contains("Submit for Review");
  });
  it("Has all SubNav modals", () => {
    visitTestPage();
    cy.get('[data-cy="NavModalSave"]').click();
    const modal = "#modal-card";
    cy.wait(300);
    cy.get(modal).should("exist").contains("Saved.");
    cy.get("body").type("{esc}");

    cy.get('[data-cy="NavModalHelp"]').click();
    cy.wait(300);
    cy.get(modal).should("exist").contains("Composer Help");
    cy.get("body").type("{esc}");

    cy.get('[data-cy="NavModalSubmit"]').click();
    cy.wait(300);
    cy.get(modal)
      .should("exist")
      .contains(/[Incomplete Draft|Editorial Release]/);
    cy.get("body").type("{esc}");
  });

  it("Accepts TitleCase title", () => {
    cy.get('[data-cy="HeaderTitleInput"]').type("hello, this's a title");
    cy.get('[data-cy="HeaderTitleInput"]').contains("Hello, This’s a Title");
  });
  it("Accepts TitleCase subtitle", () => {
    cy.get('[data-cy="HeaderSubtitleInput"]').type("this's a sub - title");
    cy.get('[data-cy="HeaderSubtitleInput"]').contains("This’s a Sub — Title");
  });
  it("Accepts and formats text in the body area", () => {
    cy.get('[data-slate-editor="true"]').type(
      "\"A text passage\" - something that's worth someone's time... "
    );
    cy.get('[data-slate-editor="true"]').contains(
      "“A text passage” — something that’s worth someone’s time… "
    );
  });
  it.skip("Can cut text", () => {});
  it.skip("Can paste text", () => {});
  it.skip("Has text edit menu", () => {});
  it.skip("Can format bold", () => {});
  it.skip("Can format quote and unquote", () => {});
  it.skip("Can format italic", () => {});
  it.skip("Can format title", () => {});
  it.skip("Can add a heading", () => {});

  it.skip("Has working submission buttons", () => {});
  it.skip("Has a link to /account", () => {});
  it.skip("Can reject an image", () => {
    // https://www.npmjs.com/package/cypress-file-upload
  });
  it.skip("Can accept an image and keep it in memory", () => {
    // https://www.npmjs.com/package/cypress-file-upload
  });
  it.skip("Can keep content in browser memory", () => {});
  it.skip("Has image edit menu", () => {});
  it.skip("Can cut image", () => {});
  it.skip("Can paste image", () => {});
});
