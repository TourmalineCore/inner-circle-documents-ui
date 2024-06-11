// returns array of indexes of payslipFileNames for which we found no employees
export function validatePayslipsFileNames({
  payslipFileNames,
  employees,
}: {
  payslipFileNames: string[],
  employees: {
    lastName: string
  }[],
}) {
  const indexes: number[] = [];

  payslipFileNames.forEach((fileName, index) => {
    const noEmployeeWithMatchingName = employees.every((employee) => !fileName.toLowerCase().includes(employee.lastName.toLowerCase()));

    if (noEmployeeWithMatchingName) {
      indexes.push(index);
    }
  });

  return indexes;
}
