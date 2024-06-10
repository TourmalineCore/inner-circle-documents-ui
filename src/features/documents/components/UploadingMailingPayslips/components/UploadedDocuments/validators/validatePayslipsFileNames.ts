// returns array of indexes of payslipFileNames for which we found no employees
export function validatePayslipsFileNames({
  payslipFileNames,
  employees,
}: {
  payslipFileNames: string[],
  employees: {
    lastName: string
  }[],
}): number[] {
  const indexes: number[] = [];
  payslipFileNames.forEach((fileName, index) => {
    let isMatched = false;
    employees.forEach((employee) => {
      if (fileName.includes(employee.lastName)) {
        isMatched = true;
      }
    });

    if (!isMatched) {
      indexes.push(index);
    }
  });

  return indexes;
}
