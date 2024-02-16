import { UploadedDocumentCard } from './UploadedDocumentCard';

describe('UploadedDocumentCard', () => {
  it(`
  GIVEN uploaded document card
  WHEN upload correct document
  THEN render uploaded document card without error
  `, () => {
    mountComponent({
      name: 'Расчетный листок Иванов за ноябрь 2023',
      error: false,
    });

    cy.getByData('uploaded-document-card')
      .should('exist');

    cy.getByData('uploaded-document-card-inner')
      .should('exist');

    cy.getByData('uploaded-document-card-header')
      .should('exist');

    cy.getByData('uploaded-document-card-name')
      .should('exist');

    cy.getByData('uploaded-document-card-delete')
      .should('exist');

    cy.getByData('uploaded-document-card-icon')
      .should('exist');

    cy.getByData('uploaded-document-card-name')
      .should('have.text', 'Иванов');

    cy.getByData('uploaded-document-card-error')
      .should('not.exist');
  });

  it(`
  GIVEN uploaded document card
  WHEN upload incorrect document 
  THEN render uploaded document card with error
  `, () => {
    mountComponent({
      name: 'Расчетный листок Иванов за ноябрь 2023',
      error: true,
    });

    cy.getByData('uploaded-document-card-name')
      .should('have.text', 'Иванов');

    cy.getByData('uploaded-document-card-error')
      .should('have.text', 'Failed to upload');
  });
});

function mountComponent({
  name,
  error,
}: {
  name: string;
  error: boolean
}) {
  cy.mount(
    <UploadedDocumentCard name={name} error={error} />,
  );
}
