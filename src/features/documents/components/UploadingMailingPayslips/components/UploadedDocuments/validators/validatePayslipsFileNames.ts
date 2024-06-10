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
  return [];
}
