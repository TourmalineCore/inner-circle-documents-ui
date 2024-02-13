import { AllDocumentsState } from '../../../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocumentsContent } from './UploadedDocumentsContent';

describe('UploadedDocumentsContent', () => {
  it(`
  GIVEN uploaded documents page
  WHEN visit personal documents page
  THEN render section uploaded documents content
  `, () => {
    mountComponent();

    cy.getByData('uploaded-documents-content')
      .should('exist');

    cy.getByData('uploaded-documents-content-uploader')
      .should('exist');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();

  cy.mount(
    <AllDocumentsStateContext.Provider value={documentsState}>
      <UploadedDocumentsContent />
    </AllDocumentsStateContext.Provider>,
  );
}
