import { AllDocumentsState } from '../AllDocuments/state/AllDocumentsState';
import { AllDocumentsStateContext } from '../AllDocuments/state/AllDocumentsStateContext';
import { PersonalDocumentsContent } from './PersonalDocumentsContent';

describe('PersonalDocumentContent', () => {
  it(`
  GIVEN personal documents page
  WHEN visit personal documents page
  THEN render date picker component
  `, () => {
    mountComponent();

    cy.getByData('personal-documents-content')
      .should('exist');

    cy.getByData('date-picker')
      .should('exist');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();

  cy.mount(
    <AllDocumentsStateContext.Provider value={documentsState}>
      <PersonalDocumentsContent />
    </AllDocumentsStateContext.Provider>,
  );
}
