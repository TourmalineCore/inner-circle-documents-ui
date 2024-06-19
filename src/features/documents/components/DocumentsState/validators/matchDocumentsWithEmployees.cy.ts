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
});
