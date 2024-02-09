import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { DocumentsList } from './DocumentsList';

describe('DocumentsList', () => {
  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList
    `, () => {
    mountComponent();

    cy.getByData('documents-list')
      .should('exist');
  });

  it(`
  GIVEN documents page 
  WHEN visit documents page
  THEN render documentList list
  `, () => {
    mountComponent();

    cy.getByData('documents-list-list')
      .should('exist');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList element
    `, () => {
    mountComponent();

    cy.getByData('documents-list-item')
      .should('exist');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList item text
    `, () => {
    mountComponent();

    cy.getByData('documents-list-text')
      .should('exist');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN documentList item have text
    `, () => {
    mountComponent();

    cy.getByData('documents-list-text')
      .first()
      .should('have.text', 'Ivanov I.I');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList item download
    `, () => {
    mountComponent();

    cy.getByData('documents-list-download')
      .should('exist');
  });

  it(`
    GIVEN all documents page 
    WHEN click on the download button for the first documenList item
    THEN correct download file
    `, () => {
    mountComponent();

    cy.getByData('documents-list-download')
      .invoke('attr', 'href')
      .then((href) => {
        cy.downloadFile(String(href), 'cypress/download', 'test.pdf');
      });

    cy.task('deleteFolder', 'cypress/download');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const allDocumentsState = new AllDocumentsState();

  allDocumentsState.initialize({
    documents: [
      {
        id: '1',
        name: 'Ivanov I.I',
        date: new Date(),
        previewLink: '',
        downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
      },
    ],
  });

  cy.mount(
    <AllDocumentsStateContext.Provider value={allDocumentsState}>
      <DocumentsList list={allDocumentsState.allDocuments} />
    </AllDocumentsStateContext.Provider>,
  );
}
