import { BrowserRouter } from 'react-router-dom';
import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { UploadingDocumentsContent } from './UploadingDocumentsContent';

describe('UploadingDocumentsContent', () => {
  it(`
  GIVEN uploading documents page
  WHEN visit uploading documents
  THEN render content uploading document
  `, () => {
    mountComponent();

    cy.getByData('uploading-documents-content')
      .should('exist');

    cy.getByData('uploading-documents-content-header')
      .should('exist');

    cy.getByData('uploader-documents')
      .should('exist');
  });

  it(`
  GIVEN uploading documents page
  WHEN visit uploading documents
  THEN render disabled send button
  `, () => {
    mountComponent();

    cy.getByData('uploading-documents-content-button')
      .should('exist');

    cy.getByData('uploading-documents-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN uploading documents page
  WHEN visit uploading documents
  THEN not render uploading document list
  `, () => {
    mountComponent();

    cy.getByData('uploading-documents-content-list')
      .should('not.exist');
  });

  it(`
  GIVEN uploading documents page
  WHEN upload file
  THEN correct upload file
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-list')
      .should('exist');

    cy.getByData('uploading-documents-content-item')
      .should('have.length', 2);

    cy.getByData('uploaded-document-card')
      .should('have.length', 2);
  });

  it(`
  GIVEN uploading documents page
  WHEN upload file
  THEN correct upload file
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-list')
      .should('exist');

    cy.getByData('uploading-documents-content-item')
      .should('have.length', 1);

    cy.getByData('uploaded-document-card')
      .should('have.length', 1);
  });

  it(`
  GIVEN uploading documents page
  WHEN click delete button on the document card
  THEN deleted document
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-list')
      .should('exist');

    cy.getByData('uploading-documents-content-item')
      .should('have.length', 1);

    cy.getByData('uploaded-document-card')
      .should('have.length', 1);

    cy.getByData('uploading-documents-content-button')
      .should('not.be.disabled');

    cy.getByData('uploaded-document-card-delete')
      .click();

    cy.getByData('uploading-documents-content-item')
      .should('not.exist');

    cy.getByData('uploaded-document-card')
      .should('not.exist');

    cy.getByData('uploading-documents-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN uploading documents page
  WHEN upload document
  THEN send button not be disabled
  `, () => {
    mountComponent();

    cy.getByData('uploading-documents-content-button')
      .should('be.disabled');

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-button')
      .should('not.be.disabled');
  });

  it(`
  GIVEN uploading documents page
  WHEN delete last uploaded document
  THEN send button be disabled
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploaded-document-card-delete')
      .click();

    cy.getByData('uploading-documents-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN uploading documents page
  WHEN click to send button
  THEN send button have cancel text
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-button')
      .should('have.text', 'Confirm');

    cy.getByData('uploading-documents-content-button')
      .click();

    cy.getByData('uploading-documents-content-button')
      .should('have.text', 'Cancel...3');
  });

  it(`
  GIVEN uploading documents page
  WHEN double click to send button
  THEN send button have confirm
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-button')
      .click();

    cy.getByData('uploading-documents-content-button')
      .click();

    cy.getByData('uploading-documents-content-button')
      .should('have.text', 'Confirm');
  });

  it(`
  GIVEN uploading documents page
  WHEN start send documents after delete uploaded document
  THEN send button have confirm
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-button')
      .click();

    cy.getByData('uploaded-document-card-delete')
      .click();

    cy.getByData('uploading-documents-content-button')
      .should('have.text', 'Confirm');
  });

  it(`
  GIVEN uploading documents page
  WHEN start send documents and wait end
  THEN uploaded documents list is empty
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ]);

    cy.getByData('uploading-documents-content-button')
      .click();

    cy.get('.uploading-documents-content__list', { timeout: 4000 })
      .should('not.exist');

    cy.getByData('uploading-documents-content-item')
      .should('have.length', 0);

    cy.getByData('uploaded-document-card')
      .should('have.length', 0);
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();

  cy.mount(
    <BrowserRouter>
      <AllDocumentsStateContext.Provider value={documentsState}>
        <UploadingDocumentsContent />
      </AllDocumentsStateContext.Provider>
    </BrowserRouter>,
  );
}
