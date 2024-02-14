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

  it(`
  GIVEN uploaded document card
  WHEN upload documents
  THEN render correct name card
  `, () => {
    mountComponent();

    cy.getByData('uploaded-document-card-name')
      .should('have.text', 'Иванов');
  });
});

function mountComponent() {
  const testFileName = 'Расчетный листок Иванов за ноябрь 2023';

  cy.mount(
    <UploadedDocumentCard name={testFileName} />,
  );
}
