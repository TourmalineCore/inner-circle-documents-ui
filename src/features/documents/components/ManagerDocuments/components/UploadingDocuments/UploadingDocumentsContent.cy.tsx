import { AllDocumentsState } from '../../../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
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

    cy.getByData('uploading-documents-content-uploader')
      .should('exist');
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

    cy.get('input[type=file]').selectFile([{
      contents: Cypress.Buffer.from('Иванов'),
      fileName: 'Расчетный листок Иванов за ноябрь 2023.pdf',
      lastModified: Date.now(),
    }, {
      contents: Cypress.Buffer.from('Сидоров'),
      fileName: 'Расчетный листок Сидоров за ноябрь 2023.pdf',
      lastModified: Date.now(),
    }]);

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

    cy.get('input[type=file]').selectFile([{
      contents: Cypress.Buffer.from('Иванов'),
      fileName: 'Расчетный листок Иванов за ноябрь 2023.pdf',
      lastModified: Date.now(),
    }]);

    cy.getByData('uploading-documents-content-list')
      .should('exist');

    cy.getByData('uploading-documents-content-item')
      .should('have.length', 1);

    cy.getByData('uploaded-document-card')
      .should('have.length', 1);
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();

  cy.mount(
    <AllDocumentsStateContext.Provider value={documentsState}>
      <UploadingDocumentsContent />
    </AllDocumentsStateContext.Provider>,
  );
}
