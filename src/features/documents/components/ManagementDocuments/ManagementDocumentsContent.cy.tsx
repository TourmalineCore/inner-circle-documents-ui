import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { ManagementDocumentsContent } from './ManagementDocumentsContent';

describe('ManagementDocumentsContent', () => {
  it(`
  GIVEN management documents page
  WHEN visit management documents page
  THEN render all component management page
  `, () => {
    mountComponent();

    cy.getByData('management-documents-content')
      .should('exist');

    cy.getByData('management-documents-content-header')
      .should('exist');

    cy.getByData('uploader-documents')
      .should('exist');

    cy.getByData('date-picker')
      .should('exist');

    cy.getByData('documents-list')
      .should('exist');
  });

  it(`
  GIVEN management documents page
  WHEN select next year in date picker component
  THEN render correct date
  `, () => {
    mountComponent();
    const currentYear = new Date().getFullYear();

    cy.getByData('date-picker-select')
      .click();

    cy.get('[aria-label="Next Year"]')
      .click();

    cy.contains('Jan')
      .click();

    cy.getByData('date-picker-result')
      .should('have.text', `January ${currentYear + 1}`);
  });

  it(`
  GIVEN management documents page 
  WHEN select previous year in date picker component
  THEN render correct date
  `, () => {
    mountComponent();
    const currentYear = new Date().getFullYear();

    cy.getByData('date-picker-select')
      .click();

    cy.get('[aria-label="Previous Year"]')
      .click();

    cy.contains('Sep')
      .click();

    cy.getByData('date-picker-result')
      .should('have.text', `September ${currentYear - 1}`);
  });

  it(`
  GIVEN management documents page 
  WHEN click on the delete icon
  THEN date picker have 'Select date' text
  `, () => {
    mountComponent();

    cy.getByData('date-picker-delete')
      .click();

    cy.getByData('date-picker-result')
      .should('have.text', 'Select date');
  });

  it(`
  GIVEN management documents page 
  WHEN visit management documents page
  THEN render 2 documents list item
  `, () => {
    mountComponent();

    cy.getByData('documents-list-item')
      .should('have.length', 2);
  });

  it(`
  GIVEN management documents page 
  WHEN select previous year and click on last month
  THEN render 1 documents list item
  `, () => {
    mountComponent();
    const currentDate = new Date();

    cy.getByData('date-picker-select')
      .click();

    cy.get('[aria-label="Previous Year"]')
      .click();

    cy.contains(moment(currentDate.setMonth(-1)).format('MMM'))
      .click();

    cy.getByData('documents-list-item')
      .should('have.length', 1);
  });

  it(`
  GIVEN management documents page 
  WHEN click on the delete icon
  THEN render 3 documents list item
  `, () => {
    mountComponent();

    cy.getByData('date-picker-delete')
      .click();

    cy.getByData('documents-list-item')
      .should('have.length', 3);
  });

  it(`
  GIVEN management documents page 
  WHEN click on the download button for the first documen list item
  THEN correct download file
  `, () => {
    mountComponent();

    cy.getByData('documents-list-download')
      .first()
      .invoke('attr', 'href')
      .then((href) => {
        cy.downloadFile(String(href), 'cypress/download', 'test.pdf');
      });

    cy.task('deleteFolder', 'cypress/download');
  });

  it(`
  GIVEN management documents page 
  WHEN clicl
  THEN render documents list empty text
  `, () => {
    mountComponent();

    cy.getByData('date-picker-select')
      .click();

    cy.contains('Apr')
      .click();

    cy.getByData('documents-list-list')
      .should('not.exist');

    cy.getByData('documents-list-empty')
      .should('exist');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();
  const currentDate = new Date();

  // TODO replacing the download url
  documentsState.initialize({
    documents: [
      {
        id: 1,
        name: 'Ivanov I.I',
        date: currentDate,
        previewLink: '',
        downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
      },
      {
        id: 2,
        name: 'Popov I.I',
        date: currentDate,
        previewLink: '',
        downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
      },
      {
        id: 3,
        name: 'Sidorov S.S',
        date: new Date(new Date().setMonth(-1)),
        previewLink: '',
        downloadLink: 'https://drive.usercontent.google.com/u/0/uc?id=1WJ1otCKCJeyLzGiPC-8L65NtWQH9TO0D&export=download',
      },
    ],
  });

  cy.mount(
    <BrowserRouter>
      <AllDocumentsStateContext.Provider value={documentsState}>
        <ManagementDocumentsContent />
      </AllDocumentsStateContext.Provider>
    </BrowserRouter>,
  );
}
