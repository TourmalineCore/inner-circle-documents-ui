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
