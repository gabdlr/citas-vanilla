import { globals } from "./globals";

describe("check delete patient behavior", () => {
  before(() => {
    cy.visit("/");
    cy.get(globals.form.pacientNameInput).type("Paciente 1");
    cy.get(globals.form.pacientOwnerInput).type("Propietario 1");
    cy.get(globals.form.pacientEmailInput).type("email1@email.com");
    cy.get(globals.form.signUpDateInput).type("2023-11-04");
    cy.get(globals.form.pacientSymptomsInput).type("Sintomas 1");
    cy.get(globals.form.submitButtonId).click();
    cy.get(globals.form.pacientNameInput).type("Paciente 2");
    cy.get(globals.form.pacientOwnerInput).type("Propietario 2");
    cy.get(globals.form.pacientEmailInput).type("email2@email.com");
    cy.get(globals.form.signUpDateInput).type("2023-11-04");
    cy.get(globals.form.pacientSymptomsInput).type("Sintomas 2");
    cy.get(globals.form.submitButtonId).click();
  });

  it("should remove paciente 1", () => {
    const textEliminarButton = "Eliminar";
    cy.get(globals.pacientList.pacientList).children().should("have.length", 2);
    cy.get("button").contains(textEliminarButton).click();
    cy.get(globals.pacientList.pacientList).children().contains("Paciente 2");
    cy.get(globals.pacientList.pacientList).should("have.length", 1);
  });
});
