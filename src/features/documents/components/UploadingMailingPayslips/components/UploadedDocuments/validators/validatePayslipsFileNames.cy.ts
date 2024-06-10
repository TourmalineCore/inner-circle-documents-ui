import { validatePayslipsFileNames } from './validatePayslipsFileNames';

describe('validatePayslipsFileNames', () => {
  it(`
  GIVEN single file 
  AND single employee
  WHEN last name matched 
  THEN no validation errors
  `, () => {
    expect(validatePayslipsFileNames({
      payslipFileNames: [
        'Расчетный листок за ноябрь Иванов 2023.pdf',
      ],
      employees: [
        {
          lastName: 'Иванов',
        },
      ],
    }).length).eq(0);
  });

  it(`
  GIVEN single file 
  AND no employee with this last name
  WHEN last name matched 
  THEN returns one validation error for index 0
  `, () => {
    expect(validatePayslipsFileNames({
      payslipFileNames: [
        'Расчетный листок за ноябрь Иванов 2023.pdf',
      ],
      employees: [
        {
          lastName: 'Петров',
        },
      ],
    })).to.deep.equal([0]);
  });
});
