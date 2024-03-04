import { API_ROOT, LINK_TO_DOCUMENTS_SERVICE } from '../../../../../common/config/config';
import { AllDocumentsState } from '../../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../../AllDocumentsState/AllDocumentsStateContext';
import { UploadingMailingPayslipsContainer } from '../UploadingMailingPayslipsContainer';

describe('UploadingMailingPayslipsContent', () => {
  it(`
  GIVEN send mailing payslips
  WHEN click on the send button 
  THEN call request to send mailing payslips
  `, () => {
    mountComponent();
    cy.intercept('POST', `${API_ROOT}${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`, {})
      .as('sendMailingPayslips');

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ], { force: true });

    cy.getByData('uploading-payslips-content-button')
      .click();

    cy.wait('@sendMailingPayslips');

    cy.getByData('uploading-payslips-content-list')
      .should('not.exist');
  });
});

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const documentsState = new AllDocumentsState();

  cy.mount(
    <AllDocumentsStateContext.Provider value={documentsState}>
      <UploadingMailingPayslipsContainer />
    </AllDocumentsStateContext.Provider>,
  );
}
