import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const color = {
  default: "rgb(0, 50, 255)",
  changing: "rgb(210, 82, 225)",
  modified: "rgb(127, 224, 81)",
};

const width = {
  default: "80px",
  small: "56px",
};

const defaultArray = [
  { value: "0", color: color.default },
  { value: "34", color: color.default },
  { value: "8", color: color.default },
  { value: "1", color: color.default },
];

const defaultArrayWithoutHead = [
  { value: "34", color: color.default },
  { value: "8", color: color.default },
  { value: "1", color: color.default },
];

const defaultArrayWithoutTail = [
  { value: "0", color: color.default },
  { value: "34", color: color.default },
  { value: "8", color: color.default },
];

const addNumber = "15";
const indexWereElementAddOrDelete = "2";

const defaultArrayFirstStep = [
  { value: "0", color: color.changing },
  { value: "34", color: color.default },
  { value: "8", color: color.default },
  { value: "1", color: color.default },
];

const defaultArraySecondStep = [
  { value: "0", color: color.changing },
  { value: "34", color: color.changing },
  { value: "8", color: color.default },
  { value: "1", color: color.default },
];

const defaultArraywithoutSecondElement = [
  { value: "0", color: color.default },
  { value: "34", color: color.default },
  { value: "1", color: color.default },
];

describe("List page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");

    cy.get('[data-testid="input"]').as("inputString");
    cy.get('[data-testid="inputId"]').as("inputId");
    cy.get('[data-testid="addToHeadButton"]').as("addToHeadButton");
    cy.get('[data-testid="addToTailButton"]').as("addToTailButton");
    cy.get('[data-testid="deleteFromHeadButton"]').as("deleteFromHeadButton");
    cy.get('[data-testid="deleteFromTailButton"]').as("deleteFromTailButton");
    cy.get('[data-testid="addByIndexButton"]').as("addByIndexButton");
    cy.get('[data-testid="deleteByIndexButton"]').as("deleteByIndexButton");
  });

  it("If input is empty add buttons &  add, delete by index are disabled", () => {
    cy.get("@inputString").should("have.value", "");
    cy.get("@addToHeadButton").should("be.disabled");
    cy.get("@addToTailButton").should("be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
    cy.get("@deleteByIndexButton").should("be.disabled");
  });

  it("Correct rendering of the default list", () => {
    cy.get("div[class^='circle_circle']").each(($el, idx) => {
      const { value, color } = defaultArray[idx];
      expect($el).to.have.text(value);
      expect($el).to.have.css("border-color", color);
      if (idx === 0) {
        cy.wrap($el).prev().should("have.text", "head");
      }
      if (idx === 3) {
        cy.wrap($el).next().next().should("have.text", "tail");
      }
    });
  });

  it("Correct adding element to the head list", () => {
    cy.get("@inputString").type(addNumber);
    cy.get("@addToHeadButton").should("not.be.disabled");
    cy.get("@addToHeadButton").click();

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.modified);
        expect($el).to.have.css("width", width.default);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.default);
        expect($el).to.have.css("width", width.default);
      });
    cy.wait(SHORT_DELAY_IN_MS);
  });

  it("Correct adding element to the tail list", () => {
    cy.get("@inputString").type(addNumber);
    cy.get("@addToTailButton").should("not.be.disabled");
    cy.get("@addToTailButton").click();

    cy.get("div[class^='circle_circle']")
      .eq(-2)
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .last()
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.modified);
        expect($el).to.have.css("width", width.default);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .last()
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.default);
        expect($el).to.have.css("width", width.default);
      });
    cy.wait(SHORT_DELAY_IN_MS);
  });

  it("Correct adding element by index", () => {
    cy.get("@inputString").type(addNumber);
    cy.get("@inputId").type(indexWereElementAddOrDelete);
    cy.get("@addByIndexButton").should("not.be.disabled");
    cy.get("@addByIndexButton").click();

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(1)
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(2)
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(2)
      .should(($el) => {
        expect($el).to.have.text(addNumber);
        expect($el).to.have.css("border-color", color.modified);
        expect($el).to.have.css("width", width.default);
      });
    cy.wait(SHORT_DELAY_IN_MS);
  });

  it("Correct deleting element from head of list", () => {
    cy.get("@deleteFromHeadButton").should("not.be.disabled");
    cy.get("@deleteFromHeadButton").click();

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(defaultArray[0].value);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']").each(($el, idx) => {
      const { value, color } = defaultArrayWithoutHead[idx];
      expect($el).to.have.text(value);
      expect($el).to.have.css("border-color", color);
      if (idx === 0) {
        cy.wrap($el).prev().should("have.text", "head");
      }
      if (idx === 2) {
        cy.wrap($el).next().next().should("have.text", "tail");
      }
    });
  });

  it("Correct deleting element from tail of list", () => {
    cy.get("@deleteFromTailButton").should("not.be.disabled");
    cy.get("@deleteFromTailButton").click();

    cy.get("div[class^='circle_circle']")
      .last()
      .should(($el) => {
        expect($el).to.have.text(defaultArray[3].value);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']").each(($el, idx) => {
      const { value, color } = defaultArrayWithoutTail[idx];
      expect($el).to.have.text(value);
      expect($el).to.have.css("border-color", color);
      if (idx === 0) {
        cy.wrap($el).prev().should("have.text", "head");
      }
      if (idx === 2) {
        cy.wrap($el).next().next().should("have.text", "tail");
      }
    });
  });

  it("Correct deleting element by index", () => {
    cy.get("@inputId").type(indexWereElementAddOrDelete);
    cy.get("@deleteByIndexButton").should("not.be.disabled");
    cy.get("@deleteByIndexButton").click();

    cy.get("div[class^='circle_circle']").each(($el, idx) => {
      const { value, color } = defaultArrayFirstStep[idx];
      expect($el).to.have.text(value);
      expect($el).to.have.css("border-color", color);
      if (idx === 0) {
        cy.wrap($el).prev().should("have.text", "head");
      }
      if (idx === 3) {
        cy.wrap($el).next().next().should("have.text", "tail");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']").each(($el, idx) => {
      const { value, color } = defaultArraySecondStep[idx];
      expect($el).to.have.text(value);
      expect($el).to.have.css("border-color", color);
      if (idx === 0) {
        cy.wrap($el).prev().should("have.text", "head");
      }
      if (idx === 3) {
        cy.wrap($el).next().next().should("have.text", "tail");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(3)
      .should(($el) => {
        expect($el).to.have.text(defaultArray[2].value);
        expect($el).to.have.css("border-color", color.changing);
        expect($el).to.have.css("width", width.small);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']").each(($el, idx) => {
      const { value, color } = defaultArraywithoutSecondElement[idx];
      expect($el).to.have.text(value);
      expect($el).to.have.css("border-color", color);
      if (idx === 0) {
        cy.wrap($el).prev().should("have.text", "head");
      }
      if (idx === 2) {
        cy.wrap($el).next().next().should("have.text", "tail");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
  });
});
