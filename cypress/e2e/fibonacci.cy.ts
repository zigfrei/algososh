import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import '../support/commands'

const stepValue = [
  "1",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "21",
  "34",
  "55",
  "89",
  "144",
  "233",
  "377",
  "610",
  "987",
  "1597",
  "2584",
  "4181",
  "6765",
];

describe("Fibonacci page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");

    cy.get('[data-testid="input"]').as("inputString");
    cy.get('[data-testid="button"]').as("reverseButton");
    cy.get('[ data-testid="circles"]').as("CirclesArray");
  });

  it("If input is empty calculate fibonacci button is disabled", () => {
    cy.get("@inputString").should("have.value", "");
    cy.get("@reverseButton").should("be.disabled");
  });

  it("If input is not empty button click will calculate fibonacci input value", () => {
    cy.get("@CirclesArray").children().should("have.length", 0);
    cy.get("@inputString").type("19");
    cy.get("@reverseButton").should("not.be.disabled");

    cy.get("@reverseButton").click();

    stepValue.forEach((_, int) => {
      cy.get("div[class^='circle_circle']")
        .should("have.length", int + 1)
        .each(($el, idx) => {
          const value = stepValue[idx];
          expect($el).to.have.text(value);
          cy.wrap($el).next().should("have.text", idx);
        });

      cy.wait(SHORT_DELAY_IN_MS);
    });
  });
});
