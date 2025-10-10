import { PayslipsState } from './PayslipsState'

const FIRST_FILE = new File(
  [
    ``,
  ],
  `afile.pdf`,
  {
    type: `application/pdf`,
  },
)

const SECOND_FILE = new File(
  [
    ``,
  ],
  `bFile.pdf`,
  {
    type: `application/pdf`,
  },
)

const THIRD_FILE = new File(
  [
    ``,
  ],
  `cFile.pdf`,
  {
    type: `application/pdf`,
  },
)

const TEST_FILE = {
  id: `abc1`,
  file: FIRST_FILE,
}

describe(`PayslipsState`, () => {
  let payslipsState: PayslipsState

  beforeEach(() => {
    payslipsState = new PayslipsState()
  })

  it(`
  GIVEN one uploaded payslip
  WHEN upload payslip
  THEN return array with one uploaded payslip
  `, () => {
    payslipsState.addUploadedPayslips([
      FIRST_FILE,
    ])

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(1)
  })

  it(`
  GIVEN two uploaded payslips
  WHEN upload payslips
  THEN return array with two uploaded payslips
  `, () => {
    payslipsState.addUploadedPayslips([
      FIRST_FILE,
      SECOND_FILE,
    ])

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(2)
  })

  it(`
  GIVEN empty uploaded and not valid payslip
  WHEN delete uploaded payslip
  THEN uploaded and not valid payslip is empty
  `, () => {
    payslipsState.addUploadedPayslips([
      FIRST_FILE,
    ])

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(1)

    payslipsState.deleteUploadedPayslip(payslipsState.allUploadedPayslips[0].id)

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(0)

    expect(payslipsState.allNotValidPayslips).to.has.lengthOf(0)
  })

  it(`
  GIVEN one not valid payslip
  WHEN uploaded not valid payslip
  THEN return array with one not valid payslip
  `, () => {
    payslipsState.addNotValidPayslipsId(TEST_FILE.id)

    expect(payslipsState.allNotValidPayslips).to.has.lengthOf(1)
  })

  it(`
  GIVEN uploaded payslips page 
  WHEN clear uploaded payslips
  THEN return empty uploaded payslips array
  `, () => {
    payslipsState.addUploadedPayslips([
      TEST_FILE.file,
    ])

    payslipsState.clearUploadedPayslips()

    expect(payslipsState.allUploadedPayslips).to.has.lengthOf(0)
  })

  it(`
  GIVEN 'isSent' equal true 
  WHEN use method 'setIsSent'
  THEN value 'isSent' changed
  `, () => {
    payslipsState.setIsSent(true)

    expect(payslipsState.isSent).to.eq(true)
  })

  it(`
  GIVEN three uploaded payslips
  WHEN upload payslips
  THEN return array with this uploaded payslips in asc order
  `, () => {
    payslipsState.addUploadedPayslips([
      THIRD_FILE,
      FIRST_FILE,
      SECOND_FILE,
    ])

    expect(payslipsState.allUploadedPayslips[0].file.name).to.eq(FIRST_FILE.name)
    expect(payslipsState.allUploadedPayslips[1].file.name).to.eq(SECOND_FILE.name)
    expect(payslipsState.allUploadedPayslips[2].file.name).to.eq(THIRD_FILE.name)
  })

  it(`
  GIVEN two uploaded payslips
  WHEN upload this two payslips
  AND after upload another one payslip
  THEN return array with this uploaded payslips in asc order
  `, () => {
    payslipsState.addUploadedPayslips([
      THIRD_FILE,
      SECOND_FILE,
    ])
    payslipsState.addUploadedPayslips([
      FIRST_FILE,
    ])

    expect(payslipsState.allUploadedPayslips[0].file.name).to.eq(FIRST_FILE.name)
    expect(payslipsState.allUploadedPayslips[1].file.name).to.eq(SECOND_FILE.name)
    expect(payslipsState.allUploadedPayslips[2].file.name).to.eq(THIRD_FILE.name)
  })

  it(`
  GIVEN one uploaded payslip
  WHEN upload this payslip
  AND it is invalid
  THEN return disable send button
  `, () => {
    payslipsState.addNotValidPayslipsId(TEST_FILE.id)

    expect(payslipsState.isSendButtonDisabled).to.eq(true)
  })

  it(`  
  GIVEN one uploaded payslip
  WHEN upload this payslip
  AND it is not invalid
  THEN return not disable send button
  `, () => {
    payslipsState.addUploadedPayslips([
      TEST_FILE.file,
    ])

    expect(payslipsState.isSendButtonDisabled).to.eq(false)
  })
})
