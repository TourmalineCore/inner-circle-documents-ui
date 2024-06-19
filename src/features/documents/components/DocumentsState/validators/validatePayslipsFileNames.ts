import { matchDocumentsWithEmployees } from './matchDocumentsWithEmployees';

/** returns array of ids of payslipDocuments for which we found no employees */
export function validatePayslipsFileNames({
  payslipDocuments,
  employees,
} : {
  payslipDocuments: {
    id: string,
    file: {
      name: string
    }
  }[],
  employees: {
    lastName: string
  }[],
}) {
  const matchedDocumentEmployeeMap = matchDocumentsWithEmployees({
    payslipDocuments,
    employees,
  });

  return payslipDocuments
    .filter((payslipDocument) => !matchedDocumentEmployeeMap[payslipDocument.id])
    .map((payslipDocument) => payslipDocument.id);
}
