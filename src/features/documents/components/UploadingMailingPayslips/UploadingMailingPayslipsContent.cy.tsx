import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { UploadingMailingPayslipsContent } from './UploadingMailingPayslipsContent';

describe('UploadingMailingPayslipsContent', () => {
  it(`
  GIVEN uploading mailing payslips page
  WHEN visit uploading mailingPayslips
  THEN render content uploading document
  `, () => {
    mountComponent();

    cy.getByData('uploading-payslips-content')
      .should('exist');

    cy.getByData('uploading-payslips-content-header')
      .should('exist');

    cy.getByData('uploader-documents')
      .should('exist');
  });

  it(`
  GIVEN disabled send button
  WHEN visit uploading payslips
  THEN render disabled send button
  `, () => {
    mountComponent();

    cy.getByData('uploading-payslips-content-button')
      .should('exist');

    cy.getByData('uploading-payslips-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN not render uploading document list
  WHEN visit uploading payslips
  THEN not render uploading document list
  `, () => {
    mountComponent();

    cy.getByData('uploading-payslips-content-list')
      .should('not.exist');
  });

  it(`
  GIVEN two uploaded document card
  WHEN upload file
  THEN correct upload file
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ], { force: true });

    cy.getByData('uploading-payslips-content-list')
      .should('exist');

    cy.getByData('uploading-payslips-content-item')
      .should('have.length', 2);

    cy.getByData('uploaded-document-card')
      .should('have.length', 2);
  });

  it(`
  GIVEN one uploaded document card
  WHEN upload file
  THEN correct upload file
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ], { force: true });

    cy.getByData('uploading-payslips-content-list')
      .should('exist');

    cy.getByData('uploading-payslips-content-item')
      .should('have.length', 1);

    cy.getByData('uploaded-document-card')
      .should('have.length', 1);
  });

  it(`
  GIVEN uploading mailing payslips page
  WHEN click delete button on the document card
  THEN deleted document
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ], { force: true });

    cy.getByData('uploading-payslips-content-list')
      .should('exist');

    cy.getByData('uploading-payslips-content-item')
      .should('have.length', 1);

    cy.getByData('uploaded-document-card')
      .should('have.length', 1);

    cy.getByData('uploading-payslips-content-button')
      .should('not.be.disabled');

    cy.getByData('uploaded-document-card-delete')
      .click();

    cy.getByData('uploading-payslips-content-item')
      .should('not.exist');

    cy.getByData('uploaded-document-card')
      .should('not.exist');

    cy.getByData('uploading-payslips-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN not disabled send button
  WHEN upload document
  THEN send button not be disabled
  `, () => {
    mountComponent();

    cy.getByData('uploading-payslips-content-button')
      .should('be.disabled');

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ], { force: true });

    cy.getByData('uploading-payslips-content-button')
      .should('not.be.disabled');
  });

  it(`
  GIVEN disabled send button
  WHEN delete last uploaded document
  THEN send button be disabled
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ], { force: true });

    cy.getByData('uploaded-document-card-delete')
      .click();

    cy.getByData('uploading-payslips-content-button')
      .should('be.disabled');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();

  cy.mount(
    <AllDocumentsStateContext.Provider value={documentsState}>
      <UploadingMailingPayslipsContent />
    </AllDocumentsStateContext.Provider>,
  );
}
