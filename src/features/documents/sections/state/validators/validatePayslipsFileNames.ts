import { matchPayslipsWithEmployees } from './matchPayslipsWithEmployees';

/** returns array of ids of payslips for which we found no employees */
export function validatePayslipsFileNames({
  payslips,
  employees,
} : {
  payslips: {
    id: string,
    file: {
      name: string
    }
  }[],
  employees: {
    lastName: string
  }[],
}) {
  const matchedDocumentEmployeeMap = matchPayslipsWithEmployees({
    payslips,
    employees,
  });

  return payslips
    .filter((payslipDocument) => !matchedDocumentEmployeeMap[payslipDocument.id])
    .map((payslipDocument) => payslipDocument.id);
}
