import { BrowserRouter } from 'react-router-dom';
import { UploaderDocuments } from './UploaderDocuments';

describe('UploadedDocumentCard', () => {
  it(`
    GIVEN uploader documents
    WHEN visit uploading documents page
    THEN render uploader document
    `, () => {
    mountComponent();

    cy.getByData('uploader-documents')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <BrowserRouter>
      <UploaderDocuments />
    </BrowserRouter>,
  );
}
