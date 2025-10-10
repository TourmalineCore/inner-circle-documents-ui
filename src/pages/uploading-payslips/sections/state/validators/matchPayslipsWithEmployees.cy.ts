import { matchPayslipsWithEmployees } from './matchPayslipsWithEmployees'

describe(`matchPayslipsWithEmployees`, () => {
  it(`
  GIVEN single file 
  WHEN no employees
  THEN map contains no relations
  `, () => {
    expect(matchPayslipsWithEmployees({
      payslips: [
        {
          id: `abc1`,
          file: {
            name: `Payslip for November Ivanov 2023.pdf`,
          },
        },
      ],
      employees: [],
    })).to.deep.equal({})
  })

  it(`
  GIVEN single file 
  AND single employee
  WHEN last name matched 
  THEN map contains one id-employee relation
  `, () => {
    expect(matchPayslipsWithEmployees({
      payslips: [
        {
          id: `abc1`,
          file: {
            name: `Payslip for November Ivanov 2023.pdf`,
          },
        },
      ],
      employees: [
        {
          lastName: `Ivanov`,
        },
      ],
    })).to.deep.equal({
      abc1: {
        lastName: `Ivanov`,
      },
    })
  })

  it(`
  GIVEN two employees
  AND two files with employee's last name in lowercase and uppercase in filename
  WHEN last name matched
  THEN map contains two id-employee relation
  `, () => {
    expect(matchPayslipsWithEmployees({
      payslips: [
        {
          id: `abc1`,
          file: {
            name: `Payslip for November for PETROV 2023.pdf`,
          },
        },
        {
          id: `abc2`,
          file: {
            name: `Payslip for November for ivanov 2023.pdf`,
          },
        },
      ],
      employees: [
        {
          lastName: `Ivanov`,
        },
        {
          lastName: `Petrov`,
        },
      ],
    })).to.deep.equal({
      abc1: {
        lastName: `Petrov`,
      },
      abc2: {
        lastName: `Ivanov`,
      },
    })
  })
}) 
