import { AllDocumentsState } from '../../../../../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../../../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocumentCard } from './UploadedDocumentCard';

describe('UploadedDocumentCard', () => {
  it(`
  GIVEN uploaded document card
  WHEN upload correct document
  THEN render uploaded document card without error
  `, () => {
    mountComponent({
      fileId: 1,
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

    cy.getByData('uploaded-document-card-delete-icon')
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
      fileId: 1,
      name: 'Расчетный листок Иванов за ноябрь 2023',
      error: true,
    });

    cy.getByData('uploaded-document-card-name')
      .should('have.text', 'Иванов');

    cy.getByData('uploaded-document-card-error')
      .should('have.text', 'The lastName in the file doesn\'t match the file name');
  });

  it(`
  GIVEN info tip text 
  WHEN hover the mouse over the icon
  THEN render info tip text
  `, () => {
    mountComponent({
      fileId: 1,
      name: 'Расчетный листок Иванов за ноябрь 2023',
      error: true,
    });

    cy.get('.info-tip')
      .trigger('mouseover');

    cy.contains('Расчетный листок Иванов за ноябрь 2023');
  });
});

function mountComponent({
  fileId,
  name,
  error,
}: {
  fileId: number;
  name: string;
  error: boolean
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();

  cy.mount(
    <AllDocumentsStateContext.Provider value={documentsState}>
      <UploadedDocumentCard fileId={fileId} name={name} error={error} />
    </AllDocumentsStateContext.Provider>,
  );
}
