import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { DocumentsProps } from '../types';
import { DocumentsList } from './DocumentsList';

// TODO replacing the download url
const testDocuments = [
  {
    id: 1,
    name: 'Ivanov I.I',
    date: new Date(),
    previewLink: '',
    downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
  },
];

describe('DocumentsList', () => {
  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList
    `, () => {
    mountComponent({
      documents: testDocuments,
    });

    cy.getByData('documents-list')
      .should('exist');
  });

  it(`
  GIVEN documents page 
  WHEN visit documents page
  THEN render documentList list
  `, () => {
    mountComponent({
      documents: testDocuments,
    });

    cy.getByData('documents-list-list')
      .should('exist');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList element
    `, () => {
    mountComponent({
      documents: testDocuments,
    });

    cy.getByData('documents-list-item')
      .should('exist');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList item text
    `, () => {
    mountComponent({
      documents: testDocuments,
    });

    cy.getByData('documents-list-text')
      .should('exist');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN documentList item have text
    `, () => {
    mountComponent({
      documents: testDocuments,
    });

    cy.getByData('documents-list-text')
      .first()
      .should('have.text', 'Ivanov I.I - February 2024');
  });

  it(`
    GIVEN documents page 
    WHEN visit documents page
    THEN render documentList item download
    `, () => {
    mountComponent({
      documents: testDocuments,
    });

    cy.getByData('documents-list-download')
      .should('exist');
  });

  it(`
    GIVEN all documents page 
    WHEN click on the download button for the first documenList item
    THEN correct download file
    `, () => {
    mountComponent({
      documents: [
        {
          id: 1,
          name: 'Ivanov I.I',
          date: new Date(),
          previewLink: '',
          downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
        },
      ],
    });

    cy.getByData('documents-list-download')
      .invoke('attr', 'href')
      .then((href) => {
        cy.downloadFile(String(href), 'cypress/download', 'test.pdf');
      });

    cy.task('deleteFolder', 'cypress/download');
  });

  it(`
    GIVEN documents page 
    WHEN documents list is empty
    THEN render empty test
    `, () => {
    mountComponent({
      documents: [],
    });

    cy.getByData('documents-list-empty')
      .should('exist');
  });
});

function mountComponent({
  documents,
}: {
  documents: DocumentsProps
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const allDocumentsState = new AllDocumentsState();

  allDocumentsState.initialize({
    documents,
  });

  cy.mount(
    <AllDocumentsStateContext.Provider value={allDocumentsState}>
      <DocumentsList list={allDocumentsState.allDocuments} />
    </AllDocumentsStateContext.Provider>,
  );
}
