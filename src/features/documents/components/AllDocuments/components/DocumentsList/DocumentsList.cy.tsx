import { AllDocumentsState } from '../../state/AllDocumentsState';
import { AllDocumentsStateContext } from '../../state/AllDocumentsStateContext';
import { DocumentsList } from './DocumentsList';

describe('DocumentsList', () => {
  it(`
    GIVEN all documents page 
    WHEN visit documents page
    THEN render documentList
    `, () => {
    mountComponent();

    cy.getByData('documents-list')
      .should('exist');
  });

  it(`
  GIVEN all documents page 
  WHEN visit documents page
  THEN render documentList list
  `, () => {
    mountComponent();

    cy.getByData('documents-list-list')
      .should('exist');
  });

  it(`
    GIVEN all documents page 
    WHEN visit documents page
    THEN render documentList element
    `, () => {
    mountComponent();

    cy.getByData('documents-list-item')
      .should('exist');
  });

  it(`
    GIVEN all documents page 
    WHEN visit documents page
    THEN render documentList item text
    `, () => {
    mountComponent();

    cy.getByData('documents-list-text')
      .should('exist');
  });

  it(`
    GIVEN all documents page 
    WHEN visit documents page
    THEN documentList item have text
    `, () => {
    mountComponent();

    cy.getByData('documents-list-text')
      .first()
      .should('have.text', 'file-1');
  });

  it(`
    GIVEN all documents page 
    WHEN visit documents page
    THEN render documentList item download
    `, () => {
    mountComponent();

    cy.getByData('documents-list-download')
      .should('exist');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const allDocumentsState = new AllDocumentsState();

  allDocumentsState.initialize({
    documents: ['file-1', 'file-2'],
  });

  cy.mount(
    <AllDocumentsStateContext.Provider value={allDocumentsState}>
      <DocumentsList list={allDocumentsState.allDocuments} />
    </AllDocumentsStateContext.Provider>,
  );
}
