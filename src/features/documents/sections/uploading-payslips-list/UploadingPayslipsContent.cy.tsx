import { PayslipsState } from '../state/PayslipsState';
import { PayslipsStateContext } from '../state/PayslipsStateContext';
import { UploadingPayslipsContent } from './UploadingPayslipsContent';

describe('UploadingPayslipsContent', () => {
  it(`
  GIVEN uploading payslips page
  WHEN visit uploading payslips
  THEN render content uploading payslip
  `, () => {
    mountComponent();

    cy
      .getByData('uploading-payslips-content')
      .should('exist');

    cy
      .getByData('uploading-payslips-content-header')
      .should('exist');

    cy
      .getByData('uploader-payslips')
      .should('exist');
  });

  it(`
  GIVEN disabled send button
  WHEN visit uploading payslips
  THEN render disabled send button
  `, () => {
    mountComponent();

    cy
      .getByData('uploading-payslips-content-button')
      .should('exist');

    cy
      .getByData('uploading-payslips-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN not render uploading payslip list
  WHEN visit uploading payslips
  THEN not render uploading payslip list
  `, () => {
    mountComponent();

    cy
      .getByData('uploading-payslips-content-list')
      .should('not.exist');
  });

  it(`
  GIVEN two uploaded payslip card
  WHEN upload file
  THEN correct upload file
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploading-payslips-content-list')
      .should('exist');

    cy
      .getByData('uploading-payslips-content-item')
      .should('have.length', 2);

    cy
      .getByData('uploaded-payslip-card')
      .should('have.length', 2);

    cy
      .getByData('uploaded-payslip-card-error')
      .should('not.exist');
  });

  it(`
  GIVEN one uploaded payslip card
  WHEN upload file
  THEN correct upload file
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploading-payslips-content-list')
      .should('exist');

    cy
      .getByData('uploading-payslips-content-item')
      .should('have.length', 1);

    cy
      .getByData('uploaded-payslip-card')
      .should('have.length', 1);

    cy
      .getByData('uploaded-payslip-card-error')
      .should('not.exist');
  });

  it(`
  GIVEN uploading payslips page
  WHEN click delete button on the payslip card
  THEN deleted payslip
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploading-payslips-content-list')
      .should('exist');

    cy
      .getByData('uploading-payslips-content-item')
      .should('have.length', 1);

    cy
      .getByData('uploaded-payslip-card')
      .should('have.length', 1);

    cy
      .getByData('uploading-payslips-content-button')
      .should('not.be.disabled');

    cy
      .getByData('uploaded-payslip-card-delete')
      .click();

    cy
      .getByData('uploading-payslips-content-item')
      .should('not.exist');

    cy
      .getByData('uploaded-payslip-card')
      .should('not.exist');

    cy
      .getByData('uploading-payslips-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN not disabled send button
  WHEN upload payslip
  THEN send button not be disabled
  `, () => {
    mountComponent();

    cy
      .getByData('uploading-payslips-content-button')
      .should('be.disabled');

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploading-payslips-content-button')
      .should('not.be.disabled');
  });

  it(`
  GIVEN disabled send button
  WHEN delete last uploaded payslip
  THEN send button be disabled
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploaded-payslip-card-delete')
      .click();

    cy
      .getByData('uploading-payslips-content-button')
      .should('be.disabled');
  });

  it(`
  GIVEN three payslips for three employees
  WHEN one of employees doesn't exist
  AND one of employees has no payslip
  THEN only two last names are valid for existing employees
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
        'cypress/fixtures/Payslip for Ilyins for April 2023.pdf',
        'cypress/fixtures/Payslip for Petrov for March 2024.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploaded-payslip-card-error')
      .should('have.length', 1);
  });

  // testing UploadedPayslip.tsx because there is a file transfer problem
  // we cannot easily read a pdf file and create File class instance for UploadedPayslip component
  it(`
  GIVEN one payslip for one existing employee
  WHEN payslip doesn't contain employee last name
  THEN render error about it
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for March 2024, he is not inside.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploaded-payslip-card-error')
      .should('have.text', 'This file doesn\'t contain the same employee last name as in its file name');
  });

  it(`
  GIVEN one payslip for one existing employee
  WHEN payslip starts with employee last name
  THEN no error
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Petrov payslip NON_EXISTING_TEXT for March 2024.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploaded-payslip-card-error')
      .should('not.exist');
  });

  it(`
  GIVEN one payslip
  WHEN employee doesn't exist
  THEN nothing is displayed in the card name
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ilyins for April 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploaded-payslip-card-name')
      .should('have.text', '');
  });

  it(`
  GIVEN two payslips
  WHEN employee's last name in lowercase and uppercase into file text
  THEN no error
  `, () => {
    mountComponent();

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023, uppercase.pdf',
        'cypress/fixtures/Payslip for Ivanov for November 2023, lowercase.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploaded-payslip-card-error')
      .should('not.exist');
  });
});

function mountComponent({
  onUploadPayslips = () => {},
}: {
  onUploadPayslips?: () => unknown,
} = {}) {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const payslipsState = new PayslipsState();

  payslipsState.initialize({
    employees: [
      {
        lastName: 'Ivanov',
      },
      {
        lastName: 'Petrov',
      },
      {
        lastName: 'Sidorov',
      },
    ],
  });

  cy.mount(
    <PayslipsStateContext.Provider value={payslipsState}>
      <UploadingPayslipsContent onUploadPayslips={(onUploadPayslips)} />
    </PayslipsStateContext.Provider>,
  );
}
