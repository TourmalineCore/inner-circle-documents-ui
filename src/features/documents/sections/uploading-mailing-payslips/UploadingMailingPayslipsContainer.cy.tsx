import { API_ROOT, LINK_TO_DOCUMENTS_SERVICE } from '../../../../common/config/config';
import { DocumentsState } from '../state/DocumentsState';
import { DocumentsStateContext } from '../state/DocumentsStateContext';
import { UploadingMailingPayslipsContainer } from './UploadingMailingPayslipsContainer';

describe('UploadingMailingPayslipsContent', () => {
  it(`
  GIVEN send mailing payslips
  WHEN click on the send button 
  THEN call request to send mailing payslips
  `, () => {
    mountComponent();

    cy
      .intercept('POST', `${API_ROOT}${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`, {})
      .as('sendMailingPayslips');

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploading-payslips-content-button')
      .click();

    cy
      .wait('@sendMailingPayslips');

    cy
      .getByData('uploading-payslips-content-list')
      .should('not.exist');
  });

  it(`
  GIVEN error message 
  WHEN call request to send mailing payslips 
  THEN render toasify with error message
  `, () => {
    mountComponent();

    cy
      .intercept('POST', `${API_ROOT}${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`, { forceNetworkError: true })
      .as('sendMailingPayslips');

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploading-payslips-content-button')
      .click();

    cy
      .wait('@sendMailingPayslips');

    cy
      .get('.Toastify__toast')
      .should('exist');

    cy
      .contains('Network Error')
      .should('exist');
  });

  it(`
  GIVEN upload documents
  WHEN upload new documents
  THEN call request to get employees and trigger validation
  AND render no errors 
  `, () => {
    mountComponent();

    cy
      .intercept('GET', `${API_ROOT}${LINK_TO_DOCUMENTS_SERVICE}getEmployees`, {})
      .as('get-employees');

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
        'cypress/fixtures/Петров Расчетный NON_EXISTING_TEXT март 2024.pdf',
      ], {
        force: true,
      });

    cy
      .wait('@get-employees');

    cy
      .getByData('uploaded-document-card-error')
      .should('not.exist');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new DocumentsState();

  cy.mount(
    <DocumentsStateContext.Provider value={documentsState}>
      <UploadingMailingPayslipsContainer />
    </DocumentsStateContext.Provider>,
  );
}
