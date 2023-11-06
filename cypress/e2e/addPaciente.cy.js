import { globals } from "./globals";

describe("check add patient behavior", () => {
  const nombrePaciente = "nombrePaciente";
  const propietarioPaciente = "propietarioPaciente";
  const emailPaciente = "emailPaciente";
  const fechaAltaPacienteValue = "2023-11-03";
  const sintomasPaciente = "sintomasPaciente";
  const withEntriesListadoPacientesText = "Listado pacientes";

  before(() => {
    cy.visit("/");
    cy.get(globals.form.pacientNameInput).type(nombrePaciente);
    cy.get(globals.form.pacientOwnerInput).type(propietarioPaciente);
    cy.get(globals.form.pacientEmailInput).type(emailPaciente);
    cy.get(globals.form.signUpDateInput).type(fechaAltaPacienteValue);
    cy.get(globals.form.pacientSymptomsInput).type(sintomasPaciente);
    cy.get(globals.form.submitButtonId).click();
  });

  it("should update listadoPaciente title", () => {
    cy.get(globals.pacientList.pacientListSubtitle).contains(
      withEntriesListadoPacientesText
    );
  });

  it("should render a new paciente card after form submission with all inputs filled", () => {
    cy.get(globals.pacientList.pacientList).children().should("have.length", 1);
  });

  //Esta prueba hay que modificarla
  it("should render proper text on each card field", () => {
    const nombrePacienteFieldText = "Nombre: ";
    const propietarioPacienteTextField = "Propietario: ";
    const emailPacienteTextField = "Email: ";
    const fechaAltaPacienteTextField = "Fecha alta: ";
    const sintomasPacienteTextField = "Sintomas: ";
    cy.get(globals.pacientCard.fieldParagraph).should(($fields) => {
      expect($fields.eq(0)).to.contain(nombrePacienteFieldText);
      expect($fields.eq(0)).to.contain(nombrePaciente);
      expect($fields.eq(1)).to.contain(propietarioPacienteTextField);
      expect($fields.eq(1)).to.contain(propietarioPaciente);
      expect($fields.eq(2)).to.contain(emailPacienteTextField);
      expect($fields.eq(2)).to.contain(emailPaciente);
      expect($fields.eq(3)).to.contain(fechaAltaPacienteTextField);
      expect($fields.eq(3)).to.contain(fechaAltaPacienteValue);
      expect($fields.eq(4)).to.contain(sintomasPacienteTextField);
      expect($fields.eq(4)).to.contain(sintomasPaciente);
    });
  });

  it("should have two buttons on paciente cards", () => {
    const textEditarButton = "Editar";
    const textEliminarButton = "Eliminar";
    cy.get(globals.pacientList.pacientList)
      .children()
      .get("button")
      .should("have.length", 2);
    cy.get(globals.pacientList.pacientList)
      .children()
      .get("button")
      .should(($buttons) => {
        expect($buttons.eq(0)).to.contain(textEditarButton);
        expect($buttons.eq(1)).to.contain(textEliminarButton);
      });
  });

  it("should show error if form is not valid, remove it after valid submission", () => {
    const errorText = "todos los campos son obligatorios";
    cy.get(globals.form.pacientNameInput).type(nombrePaciente);
    cy.get(globals.form.pacientOwnerInput).type(propietarioPaciente);
    cy.get(globals.form.pacientEmailInput).type(emailPaciente);
    cy.get(globals.form.signUpDateInput).type(fechaAltaPacienteValue);
    cy.get(globals.form.submitButtonId).click();
    cy.get(globals.formContainer.formContainer)
      .children()
      .first()
      .contains(errorText);
    cy.get(globals.form.pacientSymptomsInput).type(sintomasPaciente);
    cy.get(globals.form.submitButtonId).click();
    cy.get(globals.form.form)
      .children()
      .first()
      .should("not.contain", errorText);
  });

  it("should reset form inputs after submission", () => {
    cy.get(globals.form.pacientNameInput).type(nombrePaciente);
    cy.get(globals.form.pacientOwnerInput).type(propietarioPaciente);
    cy.get(globals.form.pacientEmailInput).type(emailPaciente);
    cy.get(globals.form.signUpDateInput).type(fechaAltaPacienteValue);
    cy.get(globals.form.pacientSymptomsInput).type(sintomasPaciente);
    cy.get(globals.form.submitButtonId).click();
    cy.get(globals.form.pacientNameInput).should("have.value", "");
    cy.get(globals.form.pacientOwnerInput).should("have.value", "");
    cy.get(globals.form.pacientEmailInput).should("have.value", "");
    cy.get(globals.form.signUpDateInput).should("have.value", "");
    cy.get(globals.form.pacientSymptomsInput).should("have.value", "");
    cy.get(globals.form.pacientIdInput).should("have.value", "");
  });
});
