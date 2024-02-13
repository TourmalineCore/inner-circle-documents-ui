import { AllDocumentsState } from '../../../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadingDocumentsContent } from './UploadingDocumentsContent';

describe('UploadingDocumentsContent', () => {
  it(`
  GIVEN uploading documents page
  WHEN visit personal documents page
  THEN render section uploading documents content
  `, () => {
    mountComponent();

    cy.getByData('uploading-documents-content')
      .should('exist');

    cy.getByData('uploading-documents-content-uploader')
      .should('exist');
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
