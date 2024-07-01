import { UploaderDocuments } from './UploaderDocuments';

describe('UploadedDocumentCard', () => {
  it(`
    GIVEN uploader documents
    WHEN visit uploading documents page
    THEN render uploader document
    `, () => {
    mountComponent();

    cy
      .getByData('uploader-documents')
      .should('exist');
  });

  it(`
    GIVEN uploader documents
    WHEN visit uploading documents page
    THEN have correct text
    `, () => {
    mountComponent();

    cy
      .getByData('uploader-documents-text')
      .should('have.text', 'Upload payslips');
  });
});

function mountComponent() {
  cy.mount(
    <UploaderDocuments
      onUploadDocuments={() => {}}
    />,
  );
}
