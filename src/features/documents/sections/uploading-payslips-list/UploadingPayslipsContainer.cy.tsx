import { PayslipsState } from '../state/PayslipsState'
import { PayslipsStateContext } from '../state/PayslipsStateContext'
import { UploadingPayslipsContainer } from './UploadingPayslipsContainer'

describe(`UploadingPayslipsContainer`, () => {
  beforeEach(() => {
    const EMPLOYEES_RESPONSE = {
      employees: [
        { 
          lastName: `Ivanov`,
        },
        {
          lastName: `Petrov`,
        },
      ],
    }

    cy.intercept(
      `GET`,
      `**/getEmployees`,
      EMPLOYEES_RESPONSE,
    )
      .as(`get-employees`)
  })

  describe(`E2E`, e2eTests)
})

function e2eTests() {
  it(`
  GIVEN upload payslips
  WHEN upload new payslips
  THEN call request to get employees and trigger validation
  AND render no errors
  `, () => {
    mountComponent()

    cy
      .intercept(
        `POST`,
        `**/sendMailingPayslips`,
        {},
      )
      .as(`sendPayslips`)

    cy
      .get(`input[type=file]`)
      .selectFile([
        `cypress/fixtures/Payslip for Ivanov for November 2023.pdf`,
        `cypress/fixtures/Petrov payslip NON_EXISTING_TEXT for March 2024.pdf`,
      ], {
        force: true,
      })

    cy
      .wait(`@get-employees`)

    cy
      .getByData(`uploaded-payslip-card-error`)
      .should(`not.exist`)

    cy
      .getByData(`uploading-payslips-content-button`)
      .click()

    cy
      .wait(`@sendPayslips`)

    cy
      .getByData(`uploading-payslips-content-list`)
      .should(`not.exist`)
  })
}

function mountComponent() {
  const payslipsState = new PayslipsState()

  cy.mount(
    <PayslipsStateContext.Provider value={payslipsState}>
      <UploadingPayslipsContainer />
    </PayslipsStateContext.Provider>,
  )
}
