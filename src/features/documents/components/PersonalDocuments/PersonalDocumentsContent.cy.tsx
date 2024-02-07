import { PersonalDocumentContent } from './PersonalDocumentsContent';

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
  cy.mount(
    <PersonalDocumentContent />,
  );
}
