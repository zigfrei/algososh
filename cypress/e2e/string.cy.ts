import { DELAY_IN_MS } from "../../src/constants/delays";

const color = {
  default: "rgb(0, 50, 255)",
  changing: "rgb(210, 82, 225)",
  modified: "rgb(127, 224, 81)",
};

const stepValue = [
  [
    { value: "1", color: color.changing },
    { value: "2", color: color.default },
    { value: "3", color: color.default },
    { value: "4", color: color.changing },
  ],
  [
    { value: "4", color: color.modified },
    { value: "2", color: color.changing },
    { value: "3", color: color.changing },
    { value: "1", color: color.modified },
  ],
  [
    { value: "4", color: color.modified },
    { value: "3", color: color.modified },
    { value: "2", color: color.modified },
    { value: "1", color: color.modified },
  ],
];

describe("String page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");

    cy.get('[data-testid="input"]').as("inputString");
    cy.get('[data-testid="button"]').as("reverseButton");
    cy.get('[ data-testid="circles"]').as("CirclesArray");
  });

  it("If input is empty reverse button is disabled", () => {
    cy.get("@inputString").should("have.value", "");
    cy.get("@reverseButton").should("be.disabled");
  });

  it("If input is not empty button click will reverse input value", () => {
    cy.get("@CirclesArray").should("have.length", 1);
    cy.get("@inputString").type("1234");
    cy.get("@reverseButton").should("not.be.disabled");

    cy.get("@reverseButton").click();

    stepValue.forEach((expectedValues) => {
      cy.get("div[class^='circle_circle']")
        .should("have.length", 4)
        .each(($el, idx) => {
          const { value, color } = expectedValues[idx];
          expect($el).to.have.text(value);
          expect($el).to.have.css("border-color", color);
        });

      cy.wait(DELAY_IN_MS);
    });
  });
});
