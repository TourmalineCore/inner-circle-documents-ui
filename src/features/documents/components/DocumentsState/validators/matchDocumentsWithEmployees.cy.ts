import { matchDocumentsWithEmployees } from './matchDocumentsWithEmployees';

describe('matchDocumentsWithEmployees', () => {
  it(`
  GIVEN single file 
  WHEN no employees
  THEN map contains no relations
  `, () => {
    expect(matchDocumentsWithEmployees({
      payslipDocuments: [
        {
          id: 'abc1',
          file: {
            name: 'Расчетный листок за ноябрь Иванов 2023.pdf',
          },
        },
      ],
      employees: [],
    })).to.deep.equal({});
  });

  it(`
  GIVEN single file 
  AND single employee
  WHEN last name matched 
  THEN map contains one id-employee relation
  `, () => {
    expect(matchDocumentsWithEmployees({
      payslipDocuments: [
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
    })).to.deep.equal({
      abc1: {
        lastName: 'Иванов',
      },
    });
  });

  it(`
    GIVEN two employees
    AND two files with employee's last name in lowercase and uppercase in filename
    WHEN last name matched
    THEN map contains two id-employee relation
    `, () => {
    expect(matchDocumentsWithEmployees({
      payslipDocuments: [
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
    })).to.deep.equal({
      abc1: {
        lastName: 'Петров',
      },
      abc2: {
        lastName: 'Иванов',
      },
    });
  });
});
