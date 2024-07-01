import { validatePayslipsFileNames } from './validatePayslipsFileNames';

describe('validatePayslipsFileNames', () => {
  it(`
  GIVEN single file 
  WHEN no employees
  THEN invalid file
  `, () => {
    expect(validatePayslipsFileNames({
      payslips: [
        {
          id: 'abc1',
          file: {
            name: 'Расчетный листок за ноябрь Иванов 2023.pdf',
          },
        },
      ],
      employees: [],
    })).to.deep.equal(['abc1']);
  });

  it(`
  GIVEN single file 
  AND single employee
  WHEN last name matched 
  THEN no validation errors
  `, () => {
    expect(validatePayslipsFileNames({
      payslips: [
        {
          id: 'abc1',
          file: {
            name: 'Расчетный листок за ноябрь Иванов 2023.pdf',
          },
        },
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
  WHEN last name not matched
  THEN returns one validation error for index 0
  `, () => {
    expect(validatePayslipsFileNames({
      payslips: [
        {
          id: 'abc1',
          file: {
            name: 'Расчетный листок за ноябрь Иванов 2023.pdf',
          },
        },
      ],
      employees: [
        {
          lastName: 'Петров',
        },
      ],
    })).to.deep.equal(['abc1']);
  });

  it(`
  GIVEN two employees
  AND two files with employee's last name in lowercase and uppercase in filename
  WHEN last name matched
  THEN no validation errors
  `, () => {
    expect(validatePayslipsFileNames({
      payslips: [
        {
          id: 'abc1',
          file: {
            name: 'Расчетный листок за ноябрь ПЕТРОВ 2023.pdf',
          },
        },
        {
          id: 'abc2',
          file: {
            name: 'Расчетный листок за ноябрь иванов 2023.pdf',
          },
        },
      ],
      employees: [
        {
          lastName: 'Иванов',
        },
        {
          lastName: 'Петров',
        },
      ],
    }).length).eq(0);
  });
});
