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
});
