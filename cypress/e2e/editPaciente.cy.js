import { globals } from "./globals";
describe("check edit pacient behavior", () => {
  const pacientName = "Pacient name";
  const pacientOwner = "Pacient owner";
  const pacientEmail = "email@email.com";
  const pacientSignUpDate = "2023-11-04";
  const pacientSymptoms = "Pacient symptoms";
  before(() => {
    cy.visit("/");
    cy.get(globals.form.pacientNameInput).type(pacientName);
    cy.get(globals.form.pacientOwnerInput).type(pacientOwner);
    cy.get(globals.form.pacientEmailInput).type(pacientEmail);
    cy.get(globals.form.signUpDateInput).type(pacientSignUpDate);
    cy.get(globals.form.pacientSymptomsInput).type(pacientSymptoms);
    cy.get(globals.form.submitButtonId).click();
    cy.get(globals.pacientCard.editButton).eq(0).click();
  });

  it("should place created pacient values into their form inputs", () => {
    cy.get(globals.form.pacientNameInput).should("have.value", pacientName);
    cy.get(globals.form.pacientOwnerInput).should("have.value", pacientOwner);
    cy.get(globals.form.pacientEmailInput).should("have.value", pacientEmail);
    cy.get(globals.form.signUpDateInput).should(
      "have.value",
      pacientSignUpDate
    );
    cy.get(globals.form.pacientSymptomsInput).should(
      "have.value",
      pacientSymptoms
    );
  });

  it("should update pacient card fields properly", () => {
    const updatedPacientName = "Pacient name updated";
    const updatedPacientOwner = "Pacient owner updated";
    const updatedPacientEmail = "emailupdated@email.com";
    const updatedPacientSignUpDate = "2023-11-05";
    const updatedPacientSymptoms = "Pacient symptoms updated";
    cy.get(globals.form.pacientNameInput).clear();
    cy.get(globals.form.pacientNameInput).type(updatedPacientName);
    cy.get(globals.form.pacientOwnerInput).clear();
    cy.get(globals.form.pacientOwnerInput).type(updatedPacientOwner);
    cy.get(globals.form.pacientEmailInput).clear();
    cy.get(globals.form.pacientEmailInput).type(updatedPacientEmail);
    cy.get(globals.form.signUpDateInput).clear();
    cy.get(globals.form.signUpDateInput).type(updatedPacientSignUpDate);
    cy.get(globals.form.pacientSymptomsInput).clear();
    cy.get(globals.form.pacientSymptomsInput).type(updatedPacientSymptoms);
    cy.get(globals.form.submitButtonId).click();
  });

  it("should show error when form is invalid", () => {
    cy.get(globals.pacientCard.editButton).eq(0).click();
    cy.get(globals.form.pacientNameInput).clear();
    cy.get(globals.form.submitButtonId).click();
    cy.get(globals.formContainer.formContainer)
      .children()
      .first()
      .contains("todos los campos son obligatorios");
  });

  it("should dismiss error if pacient in edit is deleted", () => {
    cy.get(globals.pacientCard.deleteButton).eq(0).click();
    cy.get(globals.form.form)
      .children()
      .first()
      .should("not.contain", "todos los campos son obligatorios");
  });
});
