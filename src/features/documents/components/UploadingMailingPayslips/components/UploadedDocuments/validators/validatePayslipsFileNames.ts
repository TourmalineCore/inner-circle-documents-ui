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
    if (!employees.some((employee) => fileName.toLowerCase().includes(employee.lastName.toLowerCase()))) {
      indexes.push(index);
    }
  });

  return indexes;
}
