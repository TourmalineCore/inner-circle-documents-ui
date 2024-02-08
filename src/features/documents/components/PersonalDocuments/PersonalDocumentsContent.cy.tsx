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

  it(`
  GIVEN personal documents page
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
  GIVEN all compensations page 
  WHEN select pervious year in date picker component
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
