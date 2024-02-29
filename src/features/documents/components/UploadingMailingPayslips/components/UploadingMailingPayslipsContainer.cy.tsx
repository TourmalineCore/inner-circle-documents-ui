import { API_ROOT, LINK_TO_DOCUMENTS_SERVICE } from '../../../../../common/config/config';
import { AllDocumentsState } from '../../AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from '../../AllDocumentsState/AllDocumentsStateContext';
import { UploadingMailingPayslipsContainer } from '../UploadingMailingPayslipsContainer';

describe('UploadingMailingPayslipsContent', () => {
  it(`
  GIVEN uploading mailing payslips page
  WHEN visit uploading mailingPayslips
  THEN render content uploading document
  `, () => {
    mountComponent();

    cy.get('input[type=file]').selectFile([
      'cypress/fixtures/Расчетный листок Иванов за ноябрь 2023.pdf',
    ], { force: true });

    cy.getByData('uploading-payslips-content-button')
      .click();

    cy.wait(11000);

    cy.intercept('POST', `${API_ROOT}${LINK_TO_DOCUMENTS_SERVICE}sendMailingPayslips`, {})
      .as('sendMailingPayslips');

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
