/** returns map of matched documentId-employee key value pairs */
export function matchDocumentsWithEmployees({
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
  return {};
}
