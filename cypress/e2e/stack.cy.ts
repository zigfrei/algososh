import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const color = {
  default: "rgb(0, 50, 255)",
  changing: "rgb(210, 82, 225)",
  modified: "rgb(127, 224, 81)",
};

const stepValue = [
  [{ value: "1", color: color.changing }],
  [
    { value: "1", color: color.default },
    { value: "2", color: color.changing },
  ],
  [
    { value: "1", color: color.default },
    { value: "2", color: color.default },
    { value: "3", color: color.changing },
  ],
  [
    { value: "1", color: color.default },
    { value: "2", color: color.default },
    { value: "3", color: color.default },
    { value: "4", color: color.changing },
  ],
];

const arrayForCheckDeleteButton = [1, 2, 3, 4];
const deleteStepValue = [...stepValue].reverse();

describe("Stack page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");

    cy.get('[data-testid="input"]').as("inputString");
    cy.get('[data-testid="addButton"]').as("addButton");
    cy.get('[data-testid="deleteButton"]').as("deleteButton");
    cy.get('[data-testid="clearButton"]').as("clearButton");
    cy.get('[data-testid="circles"]').as("CirclesArray");
  });

  it("If input is empty add button is disabled", () => {
    cy.get("@inputString").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
  });

  it("correctly adding an element to the stack", () => {
    stepValue.forEach((expectedValues, index) => {
      cy.get("@inputString").type(index + 1 + "");
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();
      cy.get("div[class^='circle_circle']")
        .should("have.length", index + 1)
        .each(($el, idx) => {
          const { value, color } = expectedValues[idx];
          expect($el).to.have.text(value);
          expect($el).to.have.css("border-color", color);
          cy.wrap($el).next().should("have.text", idx);
        });

      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("correctly deleting an element from the stack", () => {
    arrayForCheckDeleteButton.forEach((expectedValues, index) => {
      cy.get("@inputString").type(expectedValues + "");
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();

      cy.wait(SHORT_DELAY_IN_MS);
    });

    deleteStepValue.forEach((expectedValues, index) => {
      cy.get("@deleteButton").should("not.be.disabled");
      cy.get("@deleteButton").click();
      cy.get("div[class^='circle_circle']")
        .should("have.length", deleteStepValue.length - index)
        .each(($el, idx) => {
          const { value, color } = expectedValues[idx];
          expect($el).to.have.text(value);
          expect($el).to.have.css("border-color", color);
          cy.wrap($el).next().should("have.text", idx);
        });

      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("clear all elements from the stack", () => {
    arrayForCheckDeleteButton.forEach((expectedValues, index) => {
      cy.get("@inputString").type(expectedValues + "");
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();
      cy.wait(SHORT_DELAY_IN_MS);
    });
    cy.get("@clearButton").should("not.be.disabled");
    cy.get("@clearButton").click();
    cy.get("div[class^='circle_circle']").should("have.length", 0);
  });
});
