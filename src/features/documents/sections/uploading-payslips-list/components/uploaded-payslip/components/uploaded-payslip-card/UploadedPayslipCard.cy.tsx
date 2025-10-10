import { PayslipsState } from '../../../../../state/PayslipsState'
import { PayslipsStateContext } from '../../../../../state/PayslipsStateContext'
import { UploadedPayslipCard } from './UploadedPayslipCard'

describe(`UploadedPayslipCard`, () => {
  it(`
  GIVEN uploaded payslip card
  WHEN upload correct payslip
  THEN render uploaded payslip card without error
  `, () => {  
    mountComponent()

    cy
      .getByData(`uploaded-payslip-card`)
      .should(`exist`)

    cy
      .getByData(`uploaded-payslip-card-inner`)
      .should(`exist`)

    cy
      .getByData(`uploaded-payslip-card-header`)
      .should(`exist`)

    cy
      .getByData(`uploaded-payslip-card-name`)
      .should(`exist`)

    cy
      .getByData(`uploaded-payslip-card-delete`)
      .should(`exist`)

    cy
      .getByData(`uploaded-payslip-card-delete-icon`)
      .should(`exist`)

    cy
      .getByData(`uploaded-payslip-card-name`)
      .should(`have.text`, `Ivanov`)

    cy
      .getByData(`uploaded-payslip-card-error`)
      .should(`not.exist`)
  })

  it(`
  GIVEN uploaded payslip card
  WHEN upload incorrect payslip 
  THEN render uploaded payslip card with error
  `, () => {
    mountComponent({
      errorMessage: `This file doesn't contain the same employee last name as in its file name`,
    })

    cy
      .getByData(`uploaded-payslip-card-name`)
      .should(`have.text`, `Ivanov`)

    cy
      .getByData(`uploaded-payslip-card-error`)
      .should(`have.text`, `This file doesn't contain the same employee last name as in its file name`)
  })

  it(`
  GIVEN info tip text 
  WHEN hover the mouse over the icon
  THEN render info tip text
  `, () => {
    mountComponent()

    cy
      .get(`.info-tip`)
      .trigger(`mouseover`)

    cy.contains(`Payslip for Ivanov for November 2023`)
  })

  it(`
  GIVEN uploaded payslip card
  WHEN upload payslip that starts with employee last name
  THEN render correct last name
  `, () => {
    mountComponent({
      name: `Ivanov Payslip for November 2023`,
    })

    cy
      .getByData(`uploaded-payslip-card-name`)
      .should(`have.text`, `Ivanov`)
  })

  it(`
  GIVEN uploaded payslip card
  WHEN button not disabled
  AND change IsSent flag
  THEN button shound be disabled
  `, () => {
    mountComponent({
      name: `Ivanov Payslip for November 2023`,
    })

    cy.getByData(`uploaded-payslip-card-delete`)
      .should(`not.be.disabled`)

    cy
      .get<PayslipsState>(`@payslipsState`)
      .then((payslipsState) => {
        payslipsState.setIsSent(true)
      })

    cy.getByData(`uploaded-payslip-card-delete`)
      .should(`be.disabled`)
  })
})

function mountComponent({
  fileId = `abc1`,
  name = `Payslip for Ivanov for November 2023`,
  errorMessage = ``,
  lastName = `Ivanov`,
}: {
  fileId?: string,
  name?: string,
  errorMessage?: string,
  lastName?: string,
} = {}) {
  const payslipsState = new PayslipsState()

  cy
    .wrap(payslipsState)
    .as(`payslipsState`)

  cy.mount(
    <PayslipsStateContext.Provider value={payslipsState}>
      <UploadedPayslipCard
        fileId={fileId}
        name={name}
        errorMessage={errorMessage}
        lastName={lastName}
      />
    </PayslipsStateContext.Provider>,
  )
}
