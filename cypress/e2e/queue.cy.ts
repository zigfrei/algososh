import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const color = {
  default: "rgb(0, 50, 255)",
  changing: "rgb(210, 82, 225)",
  modified: "rgb(127, 224, 81)",
};

const stepValue = [
  [
    { value: "", color: color.changing },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
  [
    { value: "1", color: color.default },
    { value: "", color: color.changing },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
  [
    { value: "1", color: color.default },
    { value: "2", color: color.default },
    { value: "", color: color.changing },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
  [
    { value: "1", color: color.default },
    { value: "2", color: color.default },
    { value: "3", color: color.default },
    { value: "", color: color.changing },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
];

const headArray = [null, 0, 0, 0];
const tailArray = [null, 0, 1, 2];

const arrayForCheckDeleteButton = [1, 2, 3, 4];
const deleteStepValue = [
  [
    { value: "1", color: color.changing },
    { value: "2", color: color.default },
    { value: "3", color: color.default },
    { value: "4", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
  [
    { value: "", color: color.default },
    { value: "2", color: color.changing },
    { value: "3", color: color.default },
    { value: "4", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
  [
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "3", color: color.changing },
    { value: "4", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
  [
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "4", color: color.changing },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
    { value: "", color: color.default },
  ],
];

const deleteHeadArray = [0, 1, 2, 3];
const deleteTailArray = [3, 3, 3, 3];

describe("Queue page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");

    cy.get('[data-testid="input"]').as("inputString");
    cy.get('[data-testid="addButton"]').as("addButton");
    cy.get('[data-testid="deleteButton"]').as("deleteButton");
    cy.get('[data-testid="clearButton"]').as("clearButton");
  });

  it("If input is empty add button is disabled", () => {
    cy.get("@inputString").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
  });

  it("correctly adding an element to the queue", () => {
    stepValue.forEach((expectedValues, index) => {
      cy.get("@inputString").type(index + 1 + "");
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();

      cy.get("div[class^='circle_circle']").each(($el, idx) => {
        const { value, color } = expectedValues[idx];
        expect($el).to.have.text(value);
        expect($el).to.have.css("border-color", color);

        cy.wrap($el).next().should("have.text", idx);
        if (idx === headArray[index]) {
          cy.wrap($el).prev().should("have.text", "head");
        }
        if (idx === tailArray[index]) {
          cy.wrap($el).next().next().should("have.text", "tail");
        }
      });
      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("correctly deleting an element from the queue", () => {
    arrayForCheckDeleteButton.forEach((expectedValues) => {
      cy.get("@inputString").type(expectedValues + "");
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();

      cy.wait(SHORT_DELAY_IN_MS);
    });

    deleteStepValue.forEach((expectedValues, index) => {
      cy.get("@deleteButton").should("not.be.disabled");
      cy.get("@deleteButton").click();
      cy.get("div[class^='circle_circle']").each(($el, idx) => {
        const { value, color } = expectedValues[idx];
        expect($el).to.have.text(value);
        expect($el).to.have.css("border-color", color);
        if (idx === deleteHeadArray[index]) {
          cy.wrap($el).prev().should("have.text", "head");
        }
        if (idx === deleteTailArray[index]) {
          cy.wrap($el).next().next().should("have.text", "tail");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("clear all elements from the queue", () => {
    arrayForCheckDeleteButton.forEach((expectedValues) => {
      cy.get("@inputString").type(expectedValues + "");
      cy.get("@addButton").should("not.be.disabled");
      cy.get("@addButton").click();
      cy.wait(SHORT_DELAY_IN_MS);
    });
    cy.get("@clearButton").should("not.be.disabled");
    cy.get("@clearButton").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("div[class^='circle_circle']").each(($el, idx) => {
      expect($el).to.have.text("");
      expect($el).to.have.css("border-color", color.default);
    });
  });
});
