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

    cy
      .getByData('uploaded-document-card')
      .should('exist');

    cy
      .getByData('uploaded-document-card-inner')
      .should('exist');

    cy
      .getByData('uploaded-document-card-header')
      .should('exist');

    cy
      .getByData('uploaded-document-card-name')
      .should('exist');

    cy
      .getByData('uploaded-document-card-delete')
      .should('exist');

    cy
      .getByData('uploaded-document-card-delete-icon')
      .should('exist');

    cy
      .getByData('uploaded-document-card-name')
      .should('have.text', 'Иванов');

    cy
      .getByData('uploaded-document-card-error')
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
      errorMessage: 'This file doesn\'t contain the same employee last name as in its file name',
    });

    cy
      .getByData('uploaded-document-card-name')
      .should('have.text', 'Иванов');

    cy
      .getByData('uploaded-document-card-error')
      .should('have.text', 'This file doesn\'t contain the same employee last name as in its file name');
  });

  it(`
  GIVEN info tip text 
  WHEN hover the mouse over the icon
  THEN render info tip text
  `, () => {
    mountComponent({
      fileId: 'abc1',
      name: 'Расчетный листок Иванов за ноябрь 2023',
      errorMessage: '',
    });

    cy
      .get('.info-tip')
      .trigger('mouseover');

    cy.contains('Расчетный листок Иванов за ноябрь 2023');
  });

  it(`
    GIVEN uploaded document card
    WHEN upload document that starts with employee last name
    THEN render correct last name
    `, () => {
    mountComponent({
      fileId: 'abc1',
      name: 'Иванов Расчетный листок за ноябрь 2023',
      errorMessage: '',
    });

    cy
      .getByData('uploaded-document-card-name')
      .should('have.text', 'Иванов');
  });
});

function mountComponent({
  fileId,
  name,
  errorMessage,
  lastName = 'Иванов',
}: {
  fileId: string;
  name: string;
  errorMessage: string;
  lastName?: string;
}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new DocumentsState();

  cy.mount(
    <DocumentsStateContext.Provider value={documentsState}>
      <UploadedDocumentCard
        fileId={fileId}
        name={name}
        errorMessage={errorMessage}
        lastName={lastName}
      />
    </DocumentsStateContext.Provider>,
  );
}
