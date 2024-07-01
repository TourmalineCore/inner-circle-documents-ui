import { UploaderPayslips } from './UploaderPayslips';

describe('UploaderPayslips', () => {
  it(`
  GIVEN uploader payslips
  WHEN visit uploading payslips page
  THEN render uploader payslip
  `, () => {
    mountComponent();

    cy
      .getByData('uploader-payslips')
      .should('exist');
  });

  it(`
  GIVEN uploader payslips
  WHEN visit uploading payslips page
  THEN have correct text
  `, () => {
    mountComponent();

    cy
      .getByData('uploader-payslips-text')
      .should('have.text', 'Upload payslips');
  });
});

function mountComponent() {
  cy.mount(
    <UploaderPayslips
      onUploadPayslips={() => {}}
    />,
  );
}
