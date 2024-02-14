import { UploadedDocumentCard } from './UploadedDocumentCard';

describe('UploadedDocumentsCard', () => {
  it(`
  GIVEN uploaded document card
  WHEN upload documents
  THEN render uploaded document card
  `, () => {
    mountComponent();

    cy.getByData('uploaded-document-card')
      .should('exist');

    cy.getByData('uploaded-document-card-inner')
      .should('exist');

    cy.getByData('uploaded-document-card-name')
      .should('exist');

    cy.getByData('uploaded-document-card-delete')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <UploadedDocumentCard />,
  );
}
