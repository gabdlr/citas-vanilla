import { globals } from "./globals";

describe("check all initial elements to be present", () => {
  before(() => {
    cy.visit("/");
  });

  it("should contain app header", () => {
    cy.get(globals.app.header);
  });

  it("should contain a subtitle for each subarea", () => {
    cy.get(globals.formContainer.subtitle);
    cy.get(globals.pacientList.pacientListSubtitle);
  });

  it("should contain pacientes form", () => {
    cy.get(globals.form.form);
  });

  it("should contain 6 inputs in pacientes form", () => {
    cy.get(globals.form.form).get("input").should("have.length", 6);
  });

  it("should contain textarea in pacientes form", () => {
    cy.get(globals.form.pacientSymptomsInput);
  });
});
