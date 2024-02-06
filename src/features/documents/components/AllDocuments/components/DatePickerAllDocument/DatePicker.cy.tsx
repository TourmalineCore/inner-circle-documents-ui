/* eslint-disable react/jsx-no-constructed-context-values */
import { AllDocumentsState } from '../../state/AllDocumentsState';
import { AllDocumentsStateContext } from '../../state/AllDocumentsStateContext';
import { DatePickerAllDocuments } from './DatePickerAllDocuments';

describe('DatePickerAllDocuments', () => {
  it(`
  GIVEN all documents page 
  WHEN visit documents page
  THEN render date picker component
  `, () => {
    mountComponent();

    cy.getByData('date-picker-documents')
      .should('exist');
  });

  it(`
  GIVEN all documents page 
  WHEN select next year
  THEN render correct date
  `, () => {
    mountComponent();

    cy.getByData('date-picker-documents-select')
      .click();

    cy.get('[aria-label="Next Year"]')
      .click();

    cy.contains('Jan')
      .click();

    cy.getByData('date-picker-documents-result')
      .should('have.text', 'January 2024');
  });

  it(`
  GIVEN all documents page 
  WHEN select next year
  THEN render correct date
  `, () => {
    mountComponent();

    cy.getByData('date-picker-documents-select')
      .click();

    cy.get('[aria-label="Previous Year"]')
      .click();

    cy.contains('Feb')
      .click();

    cy.getByData('date-picker-documents-result')
      .should('have.text', 'February 2022');
  });
});

function mountComponent() {
  const allDocumentsState = new AllDocumentsState();

  allDocumentsState.updateDate(new Date('2023-08-1'));

  cy.mount(
    <AllDocumentsStateContext.Provider value={allDocumentsState}>
      <DatePickerAllDocuments />
    </AllDocumentsStateContext.Provider>,
  );
}
