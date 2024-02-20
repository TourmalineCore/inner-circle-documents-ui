import { AllDocumentsState } from '../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../AllDocumentsState/AllDocumentsStateContext';
import { ManagerDocumentsContent } from './ManagerDocumentsContent';

describe('ManagerDocumentsContent', () => {
  it(`
  GIVEN manager documents page
  WHEN visit manager documents page
  THEN render date picker and documents list components
  `, () => {
    mountComponent();

    cy.getByData('manager-documents-content')
      .should('exist');

    cy.getByData('manager-documents-header')
      .should('exist');

    cy.getByData('date-picker')
      .should('exist');

    cy.getByData('documents-list')
      .should('exist');
  });

  it(`
  GIVEN manager documents page
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
  GIVEN manager documents page 
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
      <ManagerDocumentsContent />
    </AllDocumentsStateContext.Provider>,
  );
}
