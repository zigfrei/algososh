describe("Testing page routing", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open main page by default", function () {
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open String page after continue link click", function () {
    cy.get('[href="/recursion"]').click();
    cy.contains("Строка");
  });

  it("should open Fibonacci page after continue link click", function () {
    cy.get("[class^=return-button_button__]").click();
    cy.get('[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open Sorting page after continue link click", function () {
    cy.go("back");
    cy.get('[href="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("should open Stack page after continue link click", function () {
    cy.go(-1);
    cy.get('[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("should open Queue page after continue link click", function () {
    cy.go(-1);
    cy.get('[href="/queue"]').click();
    cy.contains("Очередь");
  });

  it("should open Linked List page after continue link click", function () {
    cy.get("[class^=return-button_button__]").click();
    cy.get('[href="/list"]').click();
    cy.contains("Связный список");
  });
});
