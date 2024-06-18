import { DocumentsState } from '../../../../../DocumentsState/DocumentsState';
import { DocumentsStateContext } from '../../../../../DocumentsState/DocumentsStateContext';
import { UploadedDocumentCard } from './UploadedDocumentCard';

describe('UploadedDocumentCard', () => {
  it(`
  GIVEN uploaded document card
  WHEN upload correct document
  THEN render uploaded document card without error
  `, () => {
    mountComponent({
      fileId: 'abc1',
      name: 'Расчетный листок Иванов за ноябрь 2023',
      errorMessage: '',
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
      fileId: 'abc1',
      name: 'Расчетный листок Иванов за ноябрь 2023',
      errorMessage: 'The lastName in the file doesn\'t match the file name',
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
      fileId: 'abc1',
      name: 'Расчетный листок Иванов за ноябрь 2023',
      errorMessage: 'The lastName in the file doesn\'t match the file name',
    });

    cy.get('.info-tip')
      .trigger('mouseover');

    cy.contains('Расчетный листок Иванов за ноябрь 2023');
  });
});

function mountComponent({
  fileId,
  name,
  errorMessage,
}: {
  fileId: string;
  name: string;
  errorMessage: string
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new DocumentsState();

  cy.mount(
    <DocumentsStateContext.Provider value={documentsState}>
      <UploadedDocumentCard fileId={fileId} name={name} errorMessage={errorMessage} />
    </DocumentsStateContext.Provider>,
  );
}
