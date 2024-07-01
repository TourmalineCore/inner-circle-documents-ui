import { PayslipsState } from '../../../../../state/PayslipsState';
import { PayslipsStateContext } from '../../../../../state/PayslipsStateContext';
import { UploadedPayslipCard } from './UploadedPayslipCard';

describe('UploadedPayslipCard', () => {
  it(`
  GIVEN uploaded payslip card
  WHEN upload correct payslip
  THEN render uploaded payslip card without error
  `, () => {
    mountComponent({
      fileId: 'abc1',
      name: 'Расчетный листок Иванов за ноябрь 2023',
      errorMessage: '',
    });

    cy
      .getByData('uploaded-payslip-card')
      .should('exist');

    cy
      .getByData('uploaded-payslip-card-inner')
      .should('exist');

    cy
      .getByData('uploaded-payslip-card-header')
      .should('exist');

    cy
      .getByData('uploaded-payslip-card-name')
      .should('exist');

    cy
      .getByData('uploaded-payslip-card-delete')
      .should('exist');

    cy
      .getByData('uploaded-payslip-card-delete-icon')
      .should('exist');

    cy
      .getByData('uploaded-payslip-card-name')
      .should('have.text', 'Иванов');

    cy
      .getByData('uploaded-payslip-card-error')
      .should('not.exist');
  });

  it(`
  GIVEN uploaded payslip card
  WHEN upload incorrect payslip 
  THEN render uploaded payslip card with error
  `, () => {
    mountComponent({
      fileId: 'abc1',
      name: 'Расчетный листок Иванов за ноябрь 2023',
      errorMessage: 'This file doesn\'t contain the same employee last name as in its file name',
    });

    cy
      .getByData('uploaded-payslip-card-name')
      .should('have.text', 'Иванов');

    cy
      .getByData('uploaded-payslip-card-error')
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
    GIVEN uploaded payslip card
    WHEN upload payslip that starts with employee last name
    THEN render correct last name
    `, () => {
    mountComponent({
      fileId: 'abc1',
      name: 'Иванов Расчетный листок за ноябрь 2023',
      errorMessage: '',
    });

    cy
      .getByData('uploaded-payslip-card-name')
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
  const payslipsState = new PayslipsState();

  cy.mount(
    <PayslipsStateContext.Provider value={payslipsState}>
      <UploadedPayslipCard
        fileId={fileId}
        name={name}
        errorMessage={errorMessage}
        lastName={lastName}
      />
    </PayslipsStateContext.Provider>,
  );
}
